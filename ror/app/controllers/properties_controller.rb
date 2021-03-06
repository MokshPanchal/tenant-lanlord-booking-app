class PropertiesController < ApplicationController
  include ResourceRenderer
  before_action :accept_all_params

	def index
		# property = Property.where(id: params[:id]).first
    properties = Property.all
		if properties.present?
			render_success_response(array_serializer.new(properties.reverse, serializer: PropertySerializer, current_user: current_user),200)
		else
			render_unprocessable_entity("Something went wrong", 422)
		end
	end

  def create
  	# return render_unprocessable_entity("Please verify your account to upload property details", 422) if current_user.present? && !current_user.verification.present? || current_user.verification.is_verified == "approved"
		property = Property.new(property_params.except(:property_attachments_attributes))
		if property.save!
			pr = property_params[:property_attachments_attributes][:site]
      tempfile  = Tempfile.new(property.id.to_s)
      tempfile.binmode
      tempfile.write(Base64.decode64(pr))
      file = ActionDispatch::Http::UploadedFile.new(:tempfile => tempfile, :filename => "abc")
      property.picture = file
      property.save!
      property.update(image_url: Rails.application.routes.url_helpers.rails_blob_path(property.picture, only_path: true))
      # if property_params[:property_attachments_attributes].present?
      #   property_attachment = property.property_attachments.create!(site: file, property_id: property.id)
      # end
			render_success_response(property, "Property added successfully", 200)
		else
			render_unprocessable_entity("Something went wrong", 422)
		end
  end

  def show		
  	property = Property.where(id: params[:id]).first
		if property.present?
			render_success_response(single_serializer(property, PropertySerializer, current_user: current_user), 200)
		else
			render_unprocessable_entity("Something went wrong", 422)
		end
  end

  def update
  	property = Property.where(id: params[:id]).first
  	if property.update(property_update_params.except(:property_attachments_attributes))
  		# property_update_params[:property_attachments_attributes][:site].each do |pr|
    #     property_attachment = property.property_attachments.find(property_update_params[:property_attachments_attributes][:id])
      # end
        pr = property_params[:property_attachments_attributes][:site]
        tempfile  = Tempfile.new(property.id.to_s)
        tempfile.binmode
        tempfile.write(Base64.decode64(pr))
        file = ActionDispatch::Http::UploadedFile.new(:tempfile => tempfile, :filename => "abc")
        property.picture = file
        property.save!
        property.update(image_url: Rails.application.routes.url_helpers.rails_blob_path(property.picture, only_path: true))
  		  render_success_response(single_serializer(property, PropertySerializer, current_user: current_user),"Property updated successfully", 200)
		else
			render_unprocessable_entity("Something went wrong", 422)
		end
  end

  def destroy
  	property = Property.where(id: params[:id]).first
  	if property.destroy!
  		render_success_response("Property details deleted successfully", 200)
		else
			render_unprocessable_entity("Something went wrong", 422)
		end
  end

  def search
    if params[:location].present?
      query = params[:location].downcase
      properties = Property.where('lower(location) LIKE ?',"%#{query}%")
      return render_success_response(array_serializer.new(properties, serializer: PropertySerializer, current_user: current_user),200)
    end
    if params[:search].present?
      query = params[:search].downcase
      if params[:search] == "all"
        locations = Property.all.pluck(:location).uniq
        json = locations.map { |e| {e.to_sym => Property.where(location: e).count}}
        return render json: json
      end
      if (params[:search].include? "own")
        id = params[:search].split("-")[1].to_i
        properties = Property.where(user_id: id)
        return render_success_response(array_serializer.new(properties, serializer: PropertySerializer, current_user: current_user),200)
      end
      properties = Property.where('lower(name) LIKE ? OR lower(address_1) LIKE ? OR lower(address_2) LIKE ? OR lower(location) LIKE ?',"%#{query}%","%#{query}%","%#{query}%","%#{query}%")
      return render_success_response(array_serializer.new(properties, serializer: PropertySerializer, current_user: current_user),200)
    else
      index()
    end
  end

  private

  def accept_all_params
    params.permit!
  end

  def property_params
  	params.require(:property).permit(:user_id, :name, :address_1, :address_2, :post_code, :location, :status, :for_rent, :for_sell, :property_type_id, property_attachments_attributes: :site)
  end

  def property_update_params
  	params.require(:property).permit(:name, :address_1, :address_2, :post_code, :location, :status, :for_rent, :for_sell, :property_type_id, property_attachments_attributes: :site)
  end

end