class List < ActiveRecord::Base
	validates_presence_of :name
  belongs_to :board
  has_many :items, dependent: :destroy
end
