class CreateDictios < ActiveRecord::Migration[7.0]
  def change
    create_table :dictios do |t|
      t.string :user_id
      t.string :title
      t.text :disc
      t.string :env
      t.string :levelise
      t.string :goal
      t.integer :rate

      t.timestamps
    end
  end
end
