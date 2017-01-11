class GanttChart < ApplicationRecord
  has_many :tasks

  validates :name, presence: true
  validates :start, presence: true
  validates :end, presence: true
  validates_with EndNotBeforeStart
  validate :at_least_one_day
  validate :not_longer_than_one_week

  before_create :add_uid

  def self.gen_uid
    Digest::SHA1.hexdigest("#{self.name}-#{Time.current.usec}")[0..5]
  end

  def self.uid_exists?(uid)
    !self.find_by_uid(uid).blank?
  end

  private
  def add_uid
    if self.uid.blank? 
      self.uid = GanttChart.gen_uid
      while GanttChart.uid_exists?(self.uid)
        self.uid = GanttChart.gen_uid
      end
    end
  end

  def at_least_one_day
    if self.start && self.end && (self.end - self.start < 1)
      errors.add(:end, "project length can't be less than a day")
    end
  end

  def not_longer_than_one_week
    if self.start && self.end && (self.end - self.start > 7)
      errors.add(:end, "project length can't be longer than a week")
    end
  end
end
