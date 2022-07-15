class CreateHomes < ActiveRecord::Migration[7.0]
  def change
    create_table :homes do |t|
      t.string :title
      t.text :body
      t.text :info

      t.timestamps
    end
  end
end
