class Task < ApplicationRecord
  belongs_to :gantt_chart

  validates :name, presence: true
  validates :start, presence: true
  validates :end, presence: true

  validates_with NotBeforeProjectStart
  validates_with NotAfterProjectEnd
  validates_with EndNotBeforeStart
end
