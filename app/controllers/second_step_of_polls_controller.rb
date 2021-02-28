class SecondStepOfPollsController < ApplicationController

  def new
    session[:poll] = {} if session[:poll].nil?
    @poll_two = SecondStepOfPoll.new
    @poll_session = session[:poll]
  end

  def create
    strong_params = second_step_of_poll_params

    @poll_two = SecondStepOfPoll.new
    @poll_two.os_version = strong_params[:os_version].to_i

    if @poll_two.valid?
      session[:poll] = session[:poll].merge(
        os_version: @poll_two.os_version
      )

      render json: @poll_two, status: :ok
    else
      render json: { errors: @poll_one.errors.messages }, status: :unprocessable_entity
    end
  end

  private

  def second_step_of_poll_params
    params.require(:second_step_of_poll).permit(
      :os_version
    )
  end

end
