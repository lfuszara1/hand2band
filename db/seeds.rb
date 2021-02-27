# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

10.times do |_t|
  Poll.create!(
    first_name: Faker::Name.first_name,
    birth_date: Faker::Date.between(from: '1980-01-01', to: '2000-01-01'),
    os_version: Faker::Number.between(from: 1, to: 3),
    about_you: Faker::Lorem.characters(number: 140)
  )
end