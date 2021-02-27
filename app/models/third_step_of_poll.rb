class ThirdStepOfPoll

  def initialize(_token = nil); end

  attr_accessor :about_you

  include ActiveModel::Validations
  extend ActiveModel::Naming

  validates :about_you, presence: true
  validates :about_you, length: { maximum: 140 }

end
