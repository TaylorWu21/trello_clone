class ItemsController < ApplicationController
	before_action :list_params

  def index
  	render json: @list.items
  end

  def create
  	@item = @list.items.new(item_params)
  	if @item.save
  		render json: @item
  	else
  		render json: { errors @item.error.full_messages }
  	end
  end

  def update
  	@item = @list.items.find(params[:id])
  	if @item.update(item_params)
  		render json: @item
  	else
  		render json: { message: 'Failed to update' }
  	end
  end

  def destroy
  	@list.items.find(params[:id]).destroy
  	render json: { message: 'item delete' }
  end

  private

  	def list_params
  		@list = lists.find(params[:list_id])
  	end

  	def item_params
  		params.require(:item).permit(:name)
  	end
end
