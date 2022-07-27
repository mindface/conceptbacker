class QuantifiesController < ApplicationController
  before_action :set_quantify, only: %i[ show edit update destroy ]

  # GET /quantifies or /quantifies.json
  def index
    @quantifies = Quantify.all
  end

  # GET /quantifies/1 or /quantifies/1.json
  def show
  end

  # GET /quantifies/new
  def new
    @quantify = Quantify.new
  end

  # GET /quantifies/1/edit
  def edit
  end

  # POST /quantifies or /quantifies.json
  def create
    @quantify = Quantify.new(quantify_params)

    respond_to do |format|
      if @quantify.save
        format.html { redirect_to quantify_url(@quantify), notice: "Quantify was successfully created." }
        format.json { render :show, status: :created, location: @quantify }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @quantify.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /quantifies/1 or /quantifies/1.json
  def update
    respond_to do |format|
      if @quantify.update(quantify_params)
        format.html { redirect_to quantify_url(@quantify), notice: "Quantify was successfully updated." }
        format.json { render :show, status: :ok, location: @quantify }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @quantify.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /quantifies/1 or /quantifies/1.json
  def destroy
    @quantify.destroy

    respond_to do |format|
      format.html { redirect_to quantifies_url, notice: "Quantify was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_quantify
      @quantify = Quantify.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def quantify_params
      params.require(:quantify).permit(:title, :user_id, :disc, :leveliseNum, :goalNum, :rateNum)
    end
end
