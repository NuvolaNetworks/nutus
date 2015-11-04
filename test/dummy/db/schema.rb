# encoding: UTF-8

ActiveRecord::Schema.define(version: 20151104040150) do

  create_table "nutus_uploads", force: :cascade do |t|
    t.integer  "final_length", limit: 8, default: 0
    t.integer  "state",                  default: 0
    t.integer  "offset",                 default: 0
    t.integer  "received",               default: 0
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
  end

end
