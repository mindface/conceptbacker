module Api
  class QuantifiesController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :set_quantify, only: %i[ show edit update destroy ]

    def index
      @quantifies = Quantify.all
      render :json => @quantifies
    end

    def show
      render :json => @quantify

    end

    def new
      @quantify = Quantify.new
    end

    def edit
    end

    def create
      @quantify = Quantify.new(quantify_params)
      if params[:quantify]
        if @quantify.save
          render json: { status: 'quantify success' }
        else
          render json: { status: :unprocessable_entity }
        end
      end
    end

    def update
      if @quantify.update(quantify_params)
        render json: { status: 'quantify success' }
      else
        render json: @quantify.errors, status: :unprocessable_entity
      end
    end

    def destroy
      if @quantify.destroy
        render json: { status: 'delete quantify success' }
      else
        render json: @quantify.errors, status: :unprocessable_entity
      end
    end

    private
      def set_quantify
        @quantify = Quantify.find(params[:id])
      end

      def quantify_params
        params.require(:quantify).permit(:title, :user_id, :disc, :leveliseNum, :goalNum, :rateNum)
      end
  end
end