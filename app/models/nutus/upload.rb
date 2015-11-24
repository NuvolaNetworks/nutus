module Nutus
  class Upload < ActiveRecord::Base
    belongs_to :owner, class_name: Nutus.owner_class.to_s

    after_create :touch_file

    def store_path
      File.join Nutus.store_path, id.to_s, filename
    end

    private
    def touch_file
      FileUtils.mkdir_p(File.join Nutus.store_path, id.to_s)
      FileUtils.touch store_path
    end
  end
end