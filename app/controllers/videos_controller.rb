class VideosController < ApplicationController
 before_action :set_video, only: %i[ show edit update destroy ]

 def index
   @videos = Video.all
 end

 def show
  @video = Video.find(params[:id])
 end

 def new
   @video = Video.new
 end

 def edit
 end

 def create
   @video = Video.new(video_params)
   respond_to do |format|
     if @video.save
       format.html { redirect_to video_url(@video), notice: "video was successfully created." }
       format.json { render :show, status: :created, location: @video }
     else
       format.html { render :new, status: :unprocessable_entity }
       format.json { render json: @video.errors, status: :unprocessable_entity }
     end
   end
 end

 def update
   respond_to do |format|
     if @video.update(video_params)
       format.html { redirect_to video_url(@video), notice: "video was successfully updated." }
       format.json { render :show, status: :ok, location: @video }
     else
       format.html { render :edit, status: :unprocessable_entity }
       format.json { render json: @video.errors, status: :unprocessable_entity }
     end
   end
 end

 def destroy
   @video.destroy
   respond_to do |format|
     format.html { redirect_to video_url, notice: "video was successfully destroyed." }
     format.json { head :no_content }
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
