Nutus::Engine.routes.draw do
  post '/',
       to: 'uploads#create_upload'

  get '/:id',
      to: 'uploads#head_upload',
      constraints: lambda {|r| r.head?},
      as: 'head_upload'

  patch '/:id',
        to: 'uploads#patch_upload'
end
