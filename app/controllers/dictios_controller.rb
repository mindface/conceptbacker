class DictiosController < ApplicationController
  before_action :set_dictio, only: %i[ show edit update destroy ]

  # GET /dictios or /dictios.json
  def index
    @dictios = Dictio.all
  end

  # GET /dictios/1 or /dictios/1.json
  def show
  end

  # GET /dictios/new
  def new
    @dictio = Dictio.new
  end

  # GET /dictios/1/edit
  def edit
  end

  # POST /dictios or /dictios.json
  def create
    @dictio = Dictio.new(dictio_params)

    respond_to do |format|
      if @dictio.save
        format.html { redirect_to dictio_url(@dictio), notice: "Dictio was successfully created." }
        format.json { render :show, status: :created, location: @dictio }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @dictio.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /dictios/1 or /dictios/1.json
  def update
    respond_to do |format|
      if @dictio.update(dictio_params)
        format.html { redirect_to dictio_url(@dictio), notice: "Dictio was successfully updated." }
        format.json { render :show, status: :ok, location: @dictio }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @dictio.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /dictios/1 or /dictios/1.json
  def destroy
    @dictio.destroy

    respond_to do |format|
      format.html { redirect_to dictios_url, notice: "Dictio was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_dictio
      @dictio = Dictio.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def dictio_params
      params.require(:dictio).permit(:title, :user_id, :disc, :env, :levelise, :goal, :rate)
    end
end
