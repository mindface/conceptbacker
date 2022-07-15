
module Api
  class HomesController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :set_home, only: %i[ show edit update destroy ]

    def index
      @homes = Home.all
      render :json => @homes
    end

    def show
      render :json => @home
    end

    def new
      @home = Home.new
    end

    def edit
    end

    def create
      @home = Home.new(home_params)
      if params[:home]
        if @home.save
          render json: { status: 'success' }
        else
          render json: { status: :unprocessable_entity }
        end
      end
    end

    def update
      @home = Home.find_by(id: params[:home][:id])
      if @home.update(home_params)
        render json: { status: 'success' }
      else
        render json: @home.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @home = Home.find(params[:id])
      if @home.destroy
        render json: { status: 'delete success' }
      else
        render json: @home.errors, status: :unprocessable_entity
      end
    end

    private
      def set_home
        @home = Home.find(params[:id])
      end

      def home_params
        params.require(:home).permit(:title, :body, :info)
      end
end
end
