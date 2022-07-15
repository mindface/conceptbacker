class CreateConcepters < ActiveRecord::Migration[7.0]
  def change
    create_table :concepters do |t|
      t.string :title
      t.text :body
      t.text :info
      t.string :path

      t.timestamps
    end
  end
end
