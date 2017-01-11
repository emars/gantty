require 'rails_helper'

RSpec.feature 'User creates a task' do
  context 'A valid task' do
    scenario 'they see the task on the gantt chart' do
      gantt_chart = create(:gantt_chart)
      task_name = 'Test Task'
      task_start = DateTime.new
      task_end


      visit show_gantt_chart_path(gantt_chart.uid)
      click_on 'Add Task'
      fill_in 'task[name]'
    end
  end

  context  'An invalid task' do
  end
end
