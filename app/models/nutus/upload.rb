module Nutus
  class Upload < ActiveRecord::Base
    def self.create_upload final_length:
      create final_length: final_length
    end
  end
end
