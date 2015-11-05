require_dependency "nutus/application_controller"

module Nutus
  class UploadsController < ActionController::Base

    before_action only: [:head_upload, :patch_upload] do |controller|
      @upload = Upload.find params[:id]
      file_name = @upload.id.to_s
      @offset = File.exist?(file_name) ? File.stat(file_name).size : 0
    end
    
    after_action do |controller|
      response.headers['Tus-Resumable'] = '1.0.0'
    end
    
    def create_upload
      upload_length = request.headers['Upload-Length']

      upload = Upload.create_upload size: upload_length

      head :created,
           location: (url_for head_upload_path(id: upload.id))
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

      file_out = File.open params[:id], 'ab'

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
