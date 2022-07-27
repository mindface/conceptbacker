Rails.application.routes.draw do
  resources :quantifies
  resources :dictios
  resources :videos
  resources :imarings
  resources :concepters
  root 'homes#index'
  get 'homes_allinfo', to: 'homes#allinfo'
  get 'planning', to: 'planning#index'
  namespace :api, format: 'json' do
    resources :homes
    resources :imarings
    resources :videos
    resources :dictios
    resources :quantifies
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
