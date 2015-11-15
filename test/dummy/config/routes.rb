Rails.application.routes.draw do

  devise_for :users

  root to: 'demo#index'

  mount Nutus::Engine => '/nutus'
end
