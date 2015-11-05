Rails.application.routes.draw do

  get '/',
      to: 'demo#index'

  mount Nutus::Engine => '/uploads'
end
