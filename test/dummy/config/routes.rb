Rails.application.routes.draw do

  get '/',
      to: 'demo#index'

  mount Nutus::Engine => '/pf/nutus'
end
