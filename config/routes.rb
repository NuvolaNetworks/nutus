Nutus::Engine.routes.draw do
  post '/uploads', to: 'uploads#create_upload'

  get '/uploads/:id',
      to: 'uploads#head_upload',
      constraints: lambda { |r| r.head? },
      as: 'head_upload'

  patch '/uploads/:id',
        to: 'uploads#patch_upload'
end