class FirstStepOfPollsController < ApplicationController

  def new
    session[:poll] = {} if session[:poll].nil?
    @poll_one = FirstStepOfPoll.new
    @poll_session = session[:poll]
  end

  def create
    strong_params = first_step_of_poll_params
    @poll_one = FirstStepOfPoll.new

    @poll_one.first_name = strong_params[:first_name]
    @poll_one.birth_date = strong_params[:birth_date]

    if @poll_one.valid?
      session[:poll] = session[:poll].merge(
        first_name: @poll_one.first_name,
        birth_date: @poll_one.birth_date
      )

      render json: @poll_one, status: :ok
    else
      render json: { errors: @poll_one.errors.messages }, status: :unprocessable_entity
    end
  end

  private

  def first_step_of_poll_params
    params.require(:first_step_of_poll).permit(
      :first_name,
      :birth_date
    )
  end

end
