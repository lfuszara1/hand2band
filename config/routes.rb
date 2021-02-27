Rails.application.routes.draw do
  get 'first_step_of_polls', to: "first_step_of_polls#new"
  post 'first_step_of_polls', to: "first_step_of_polls#create"

  get 'second_step_of_polls', to: "second_step_of_polls#new"
  post 'second_step_of_polls', to: "second_step_of_polls#create"

  get 'third_step_of_polls', to: "third_step_of_polls#new"
  post 'third_step_of_polls', to: "third_step_of_polls#create"

  get 'polls/index'

  root to: "polls#index"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
