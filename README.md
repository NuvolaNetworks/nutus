### Nutus - The Nuvola tus.io Resumable File Uploader

Here be a Rails Engine that is a minimal implementation of the [tus.io Open Protocol for Resumable Uploads](http://tus.io).

We're still not exactly sure what words are behind the TUS acronym, but we DO know that the protocol works.

This implementation is brought to you by the good folks at [Nuvola Networks](http://nuvola-networks.com), who currently use tus.io in production.

#### Coming soon! (April 2016-ish)

- Documentation!
- Open source license!
- Publish to rubygems.org!
- Fame! Fortune! (Or maybe at least a "Kudos guys, that thing you did was alright." :))


# Documentation

Add the following to your model

     class ModelName < ActiveRecord::Base
     ...
     attr_accessor :nutus_upload_url
     mount_uploader :assets, Uploader
     ...
     end
This gives the model somewhere to store the nutus url (just in ram)

In your form include this
     
     <div>
        <input type="file" onchange="app.uploader(this);">
        <%= f.hidden_field :nutus_upload_url %>
      </div>

Finally, in the controller (if using carrierwave) add this 

     def update
     ...
     nutus_upload = Nutus::Upload.find i.nutus_upload_url.split(/\//).last
     nutus_upload_file = File.open nutus_upload.store_path
     vu = i.assets.nil? ? Uploader.new : i.assets
     vu.store! nutus_upload_file
     @model.cap_assets = vu
     @model.save
     ...
     end
