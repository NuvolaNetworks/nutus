# This migration comes from nutus (originally 20151114201951)
class AddOwnerIdToNutusUploads < ActiveRecord::Migration
  def change
    add_column :nutus_uploads, :owner_id, :integer
  end
end
