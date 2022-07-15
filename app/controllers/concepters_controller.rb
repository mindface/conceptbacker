class ConceptersController < ApplicationController
  before_action :set_concepter, only: %i[ show edit update destroy ]

  # GET /concepters or /concepters.json
  def index
    @concepters = Concepter.all
  end

  # GET /concepters/1 or /concepters/1.json
  def show
  end

  # GET /concepters/new
  def new
    @concepter = Concepter.new
  end

  # GET /concepters/1/edit
  def edit
  end

  # POST /concepters or /concepters.json
  def create
    @concepter = Concepter.new(concepter_params)

    respond_to do |format|
      if @concepter.save
        format.html { redirect_to concepter_url(@concepter), notice: "Concepter was successfully created." }
        format.json { render :show, status: :created, location: @concepter }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @concepter.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /concepters/1 or /concepters/1.json
  def update
    respond_to do |format|
      if @concepter.update(concepter_params)
        format.html { redirect_to concepter_url(@concepter), notice: "Concepter was successfully updated." }
        format.json { render :show, status: :ok, location: @concepter }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @concepter.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /concepters/1 or /concepters/1.json
  def destroy
    @concepter.destroy

    respond_to do |format|
      format.html { redirect_to concepters_url, notice: "Concepter was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_concepter
      @concepter = Concepter.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def concepter_params
      params.require(:concepter).permit(:title, :body, :info, :path)
    end
end
