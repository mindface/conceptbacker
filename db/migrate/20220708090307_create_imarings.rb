class CreateImarings < ActiveRecord::Migration[7.0]
  def change
    create_table :imarings do |t|
      t.string :name
      t.string :conectid

      t.timestamps
    end
  end
end
