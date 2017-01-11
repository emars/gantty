class NotAfterProjectEnd < ActiveModel::Validator
  def validate(record)
    if record.end && record.gantt_chart.end
      if record.end > record.gantt_chart.end
        record.errors[:end] << 'cannot be after the end of the project.'
      end
    end
  end
end
