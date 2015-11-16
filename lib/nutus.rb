require 'nutus/engine'
require 'fileutils'

module Nutus
  mattr_accessor :owner_class
  mattr_accessor :user_reader_name
  mattr_accessor :store_path

  @@owner_class = 'User'
  @@user_reader_name = 'current_user'
  @@store_path = ENV['NUTUS_STORE_PATH'] || '/tmp'

  FileUtils.mkdir_p @@store_path unless File.exists? @@store_path
  
  def self.owner_class
    @@owner_class.constantize
  end
end
