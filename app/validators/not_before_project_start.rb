class NotBeforeProjectStart < ActiveModel::Validator
  def validate(record)
    if record.start && record.gantt_chart.start
      if record.start < record.gantt_chart.start
        record.errors[:start] << 'cannot be before the start of the project.'
      end
    end
  end
end
