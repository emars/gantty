class AddAssociationToTasks < ActiveRecord::Migration[5.0]
  def change
    change_table :tasks do |t|
      t.belongs_to :gantt_chart
    end
  end
end
