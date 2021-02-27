class SecondStepOfPoll

  include ActiveModel::Validations
  extend ActiveModel::Naming

  def initialize(_token = nil); end

  attr_accessor :os_version

  validates :os_version, presence: true
  validates :os_version, inclusion: { in: [1, 2, 3] }

end
