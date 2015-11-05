class CreateNutusUploads < ActiveRecord::Migration
  def change
    create_table :nutus_uploads do |t|
      t.column :size, :integer, limit: 8, default: 0
#      t.column :state, :integer, default: 0
#      t.column :offset, :integer, default: 0
#      t.column :received, :integer, default: 0
      t.timestamps null: false
    end
  end
end
