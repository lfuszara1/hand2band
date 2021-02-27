class PollsController < ApplicationController
  def index
    redirect_to first_step_of_polls_path
  end
end
