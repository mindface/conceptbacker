module Api
  class VideosController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :set_video, only: %i[ show edit update destroy ]

    def index
      @videos = Video.all
      @_videos = []
      @videos.each do | video |
        @_videos.push({
          id: video.id,
          title: video.title,
          conectid: video.conectid,
          introduction: video.introduction,
          video: video.video,
          path: url_for(video.video),
        })
      end
      render :json => @_videos
    end

    def show
      render :json => @video
    end

    def new
      @video = Video.new
    end

    def edit
    end

    def create
      Rails.logger.debug(params[:video])
      @video = Video.new(video_params)
      if params[:video]
        if @video.save
          render json: { status: 'success' }
        else
          render json: { status: :unprocessable_entity }
        end
      end
    end

    def update
      @video = Video.find_by(id: params[:video][:id])
      if @video.update(video_params)
        render json: { status: 'success' }
      else
        render json: @video.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @video = Video.find(params[:id])
      # videoStrage = ActiveStorage::Blob.find_signed(params[:id]
      # videoStrage.purge
      @video.video.purge
      if @video.destroy
        render json: { status: 'delete success' }
      else
        render json: @video.errors, status: :unprocessable_entity
      end
    end

    private
      def set_video
        @video = Video.find(params[:id])
      end

      def video_params
        params.require(:video).permit(:title, :introduction, :conectid, :video)
      end
  end
end
