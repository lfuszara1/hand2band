class Poll < ApplicationRecord

  enum os_version: { mac_os: 1, linux: 2, windows: 3 }

  validates :first_name, presence: true
  validates :first_name, length: { maximum: 255 }
  validates :birth_date, presence: true
  validates :birth_date, format: { with: /(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])\z/, message: "please provide good date" }
  validates :os_version, presence: true
  validates :os_version, inclusion: { in: os_versions.keys }
  validates :about_you, presence: true
  validates :about_you, length: { maximum: 140 }

end
