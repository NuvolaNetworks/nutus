module Nutus
  class Upload < ActiveRecord::Base
    attr_accessor :owner_id
    belongs_to :owner, class_name: Nutus.owner_class.to_s
  end
end