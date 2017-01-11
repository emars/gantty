Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'gantt_charts#index'
  get 'new', to: 'gantt_charts#new', as: 'new_gantt_chart'
  get ':uid', to: 'gantt_charts#show', as: 'show_gantt_chart'
  get ':uid/edit', to: 'gantt_charts#edit', as: 'edit_gantt_chart'
  get ':uid/new', to: 'tasks#new', as: 'new_task'
  put ':uid', to: 'gantt_charts#save_tasks'
  post ':uid/new', to: 'tasks#create', as: 'create_task'

  resources :gantt_charts, only: [:create, :edit, :update]
  # resources :tasks, only: [:create]
end
