class EndNotBeforeStart < ActiveModel::Validator
  def validate(record)
    if record.end && record.start
      if record.end < record.start
        record.errors[:end] << 'cannot be before the start.'
      end
    end
  end
end
