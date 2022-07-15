module Api
  class ImaringsController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :set_imaring, only: %i[ show edit update destroy ]

    def index
      @imarings = Imaring.all
      @_imarings = []
      @imarings.each do | item |
        path = []
        item.images.each do | image |
          path.push(url_for(image))
        end
        @_imarings.push({
          id: item.id,
          name: item.name,
          conectid: item.conectid,
          images: item.images,
          path: path,
        })
      end
      render :json => @_imarings
    end

    def show
      render :json => @imaring
    end

    def new
      @imaring = Imaring.new
    end

    def edit
    end

    def create
      @imaring = Imaring.new(imaring_params)
      if params[:imaring]
        if @imaring.save
          render json: { status: 'success' }
        else
          render json: { status: :unprocessable_entity }
        end
      end
    end

    def update
      @imaring = Imaring.find_by(id: params[:imaring][:id])
      if @imaring.update(imaring_params)
        render json: { status: 'success' }
      else
        render json: @imaring.errors, status: :unprocessable_entity
      end
    end

    def destroy
      if @imaring.destroy
        @imaring.images.purge
        render json: { status: 'delete success' }
      else
        render json: @imaring.errors, status: :unprocessable_entity
      end
    end

    private
      def set_imaring
        @imaring = Imaring.find(params[:id])
      end

      def imaring_params
        params.require(:imaring).permit(:name, :conectid, images: [])
      end
  end
end
