require 'rails_helper'

RSpec.feature 'User creates a task' do
  context 'A valid task' do
    scenario 'they see the task on the gantt chart' do
      gantt_chart = create(:gantt_chart)
      task_name = 'Test Task'
      task_start = DateTime.now.days_ago(5)
      task_end = DateTime.now

      visit show_gantt_chart_path(gantt_chart.uid)
      click_on 'Add Task', match: :first
      fill_in 'task[name]', with: task_name
      fill_in 'task[start]', with: task_start
      fill_in 'task[end]', with: task_end
      click_on 'Submit'
    end
  end

  context  'An invalid task' do
  end
end
