module Nutus
  class Upload < ActiveRecord::Base
    belongs_to :owner, class_name: Nutus.owner_class.to_s
  end
end
