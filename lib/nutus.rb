require 'nutus/engine'

module Nutus
  mattr_accessor :owner_class
  mattr_accessor :user_reader_name

  def self.owner_class
    @@owner_class.constantize
  end
end