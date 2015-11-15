class AddOwnerIdToNutusUploads < ActiveRecord::Migration
  def change
    add_column :nutus_uploads, :owner_id, :integer
  end
end
