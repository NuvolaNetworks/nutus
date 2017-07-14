$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "nutus/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "nutus"
  s.version     = Nutus::VERSION
  s.authors     = ["Nuvola Networks"]
  s.email       = ["mattschlobohm@users.noreply.github.com"]
  s.homepage    = ""
  s.summary     = ""
  s.description = ""
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "Rakefile"]
  s.test_files = Dir["test/**/*"]

  s.required_ruby_version = '~> 2'
  

  [['devise'],
   ['pry'],
   ['pry-rails'],
   ['spring'],
   ['sqlite3']
  ].each do |d|
    s.add_development_dependency d.first
  end
end
