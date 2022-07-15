class ImaringsController < ApplicationController
  before_action :set_imaring, only: %i[ show edit update destroy ]

  # GET /imarings or /imarings.json
  def index
    @imarings = Imaring.all
  end

  # GET /imarings/1 or /imarings/1.json
  def show
  end

  # GET /imarings/new
  def new
    @imaring = Imaring.new
  end

  # GET /imarings/1/edit
  def edit
  end

  # POST /imarings or /imarings.json
  def create
    @imaring = Imaring.new(imaring_params)

    respond_to do |format|
      if @imaring.save
        format.html { redirect_to imaring_url(@imaring), notice: "Imaring was successfully created." }
        format.json { render :show, status: :created, location: @imaring }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @imaring.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /imarings/1 or /imarings/1.json
  def update
    respond_to do |format|
      if @imaring.update(imaring_params)
        format.html { redirect_to imaring_url(@imaring), notice: "Imaring was successfully updated." }
        format.json { render :show, status: :ok, location: @imaring }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @imaring.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /imarings/1 or /imarings/1.json
  def destroy
    @imaring.destroy

    respond_to do |format|
      format.html { redirect_to imarings_url, notice: "Imaring was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_imaring
      @imaring = Imaring.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def imaring_params
      params.require(:imaring).permit(:name, :conectid, images: [])
    end
end
