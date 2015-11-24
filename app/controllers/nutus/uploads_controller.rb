require_dependency "nutus/application_controller"
require 'fileutils'

module Nutus
  class UploadsController < ApplicationController

    before_action only: [:head_upload, :patch_upload] do |controller|
      @upload = Upload.find params[:id]
      @offset = File.exist?(@upload.store_path) ? File.stat(@upload.store_path).size : 0
    end

    before_action do |controller|
      @user = self.send Nutus.user_reader_name
      if !Nutus.owner_class.allow? params: params, user: @user, upload: @upload
        head :forbidden
      end
    end

    after_action do |controller|
      response.headers['Tus-Resumable'] = '1.0.0'
    end
    
    def create_upload
      upload_length = request.headers['Upload-Length']
      # TODO process multiple metadatas in header and generically according to protocol
      filename = Base64.decode64(request.headers['Upload-Metadata'].split.last)
      @upload = Upload.create size: upload_length, owner: @user, filename: filename
      head :created,
           location: (url_for head_upload_path(id: @upload.id))
    end

    def head_upload
      head :no_content,
           'Upload-Offset' => @offset
    end

    def patch_upload
      offset_start = request.headers['Upload-Offset'].to_i
      if @offset != offset_start
        head :conflict and return
      end

      offset_end = request.content_length + offset_start
      if @upload.size < offset_end
        head :conflict and return
      end

      file_out = File.open @upload.store_path, 'ab'

      bytes_in = ''
      while !bytes_in.nil? && @offset < @upload.size do
        bytes_in = request.body.read(4096)

        if bytes_in == nil
          break
        end

        file_out.write bytes_in
        @offset += bytes_in.size
      end

      file_out.close
      
      head :no_content,
           'Upload-Offset' => @offset
    end
  end
end
