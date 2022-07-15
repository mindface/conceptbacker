Rails.application.routes.draw do
  resources :dictios
  resources :videos
  resources :imarings
  resources :concepters
  root 'homes#index'
  resources :homes
  get 'homes_allinfo', to: 'homes#allinfo'
  namespace :api, format: 'json' do
    resources :homes
    resources :imarings
    resources :videos
    resources :dictios
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
