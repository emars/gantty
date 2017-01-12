FactoryGirl.define do
  factory :gantt_chart do
    name 'Test Chart'
    start DateTime.now.days_ago(3)
    send :end, DateTime.now
  end
end
