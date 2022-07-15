module Api
  class DictiosController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :set_dictio, only: %i[ show edit update destroy ]

    def index
      @dictios = Dictio.all
      render :json => @dictios
    end

    def show
      render :json => @dictio

    end

    def new
      @dictio = Dictio.new
    end

    def edit
    end

    def create
      @dictio = Dictio.new(dictio_params)
      if params[:dictio]
        if @dictio.save
          render json: { status: 'success' }
        else
          render json: { status: :unprocessable_entity }
        end
      end
    end

    def update
      if @dictio.update(dictio_params)
        render json: { status: 'success' }
      else
        render json: @dictio.errors, status: :unprocessable_entity
      end
    end

    def destroy
      if @dictio.destroy
        render json: { status: 'delete success' }
      else
        render json: @video.errors, status: :unprocessable_entity
      end
    end

    private
      def set_dictio
        @dictio = Dictio.find(params[:id])
      end

      def dictio_params
        params.require(:dictio).permit(:title, :user_id, :disc, :env, :levelise, :goal, :rate)
      end
  end
end