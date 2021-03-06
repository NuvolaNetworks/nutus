class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  #protect_from_forgery with: :exception

  before_action lambda { |controller|
    sign_out current_user
    begin
      sign_in :user, User.find(request.headers[:userid])
    rescue
      logger.debug {"could not sign in #{params[:userid]}"}
    end
  }
end
