class CreateQuantifies < ActiveRecord::Migration[7.0]
  def change
    create_table :quantifies do |t|
      t.string :title
      t.string :user_id
      t.string :disc
      t.string :leveliseNum
      t.string :goalNum
      t.integer :rateNum

      t.timestamps
    end
  end
end
