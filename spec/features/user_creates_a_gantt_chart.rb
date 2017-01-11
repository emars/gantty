require 'rails_helper'

RSpec.feature 'User creates a gantt chart' do
  scenario 'they see the page for the gantt chart' do
    gantt_chart_name = 'Test Chart'
    gantt_chart_start = DateTime.now
    gantt_chart_end = DateTime.now.days_ago(-7)

    visit root_path
    click_on 'New Chart', match: :first
    fill_in 'gantt_chart[name]', with: gantt_chart_name
    fill_in 'gantt_chart[start]', with: gantt_chart_start
    fill_in 'gantt_chart[end]', with: gantt_chart_end
    click_on 'Create'

    expect(page).to have_content "Showing: #{gantt_chart_name}"
  end
end
