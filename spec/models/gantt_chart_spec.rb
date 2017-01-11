require 'rails_helper'

RSpec.describe GanttChart, 'validations' do
  it { expect(subject).to validate_presence_of (:name) }
  it { expect(subject).to validate_presence_of (:start) }
  it { expect(subject).to validate_presence_of (:end) }
end
