class FirstStepOfPoll

  include ActiveModel::Validations

  def initialize(_token = nil); end

  attr_accessor :first_name, :birth_date

  validates :first_name, presence: true
  validates :first_name, length: { maximum: 255 }
  validates :birth_date, presence: true

end
