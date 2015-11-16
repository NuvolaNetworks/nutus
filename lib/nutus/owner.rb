module Nutus
  module Owner
    def self.included base
      base.extend ClassMethods
    end

    module ClassMethods
      def allow? params: params, user: user, upload: upload
        allow = !!user
        unless params[:action] == 'create_upload'
          allow &&= user == upload.owner
        end
        allow
      end
    end
  end
end
