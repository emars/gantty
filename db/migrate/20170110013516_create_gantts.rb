class CreateGantts < ActiveRecord::Migration[5.0]
  def change
    create_table :gantt_charts do |t|
      t.string :name
      t.string :uid
      t.date :start
      t.date :end

      t.timestamps
    end
  end
end
