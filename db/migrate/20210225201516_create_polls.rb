class CreatePolls < ActiveRecord::Migration[6.1]
  def change
    create_table :polls do |t|
      t.string :first_name
      t.date :birth_date
      t.integer :os_version
      t.string :about_you

      t.timestamps
    end
  end
end
