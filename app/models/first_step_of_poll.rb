class FirstStepOfPoll

  include ActiveModel::Validations

  def initialize(_token = nil); end

  attr_accessor :first_name, :birth_date

  validates :first_name, presence: true
  validates :first_name, length: { maximum: 255 }
  validates :birth_date, presence: true
  validates :birth_date, format: { with: /(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])\z/, message: "please provide good date" }

end
