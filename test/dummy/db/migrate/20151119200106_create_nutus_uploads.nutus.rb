# This migration comes from nutus (originally 20151119040150)
class CreateNutusUploads < ActiveRecord::Migration
  def change
    create_table :nutus_uploads do |t|
      t.integer :size, limit: 8, default: 0
      t.string :filename
      t.integer :owner_id
    end
  end
end
