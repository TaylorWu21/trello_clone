class Board < ActiveRecord::Base
	validates_presence_of :name
	has_many :lists, dependent: :destroy
end
