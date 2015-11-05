module Nutus
  class Upload < ActiveRecord::Base
    def self.create_upload size:
      create size: size
    end
  end
end
