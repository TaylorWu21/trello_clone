class Lists extends React.Component {
	constructor(props) {
		super(props);
		this.state = { lists: [] };
		this.deleteList = this.deleteList.bind(this);
		this.updateList = this.updateList.bind(this);
	}

	componentWillMount() {
		$.ajax({
			url: `/boards/${this.props.boardId}/lists`,
			type: 'GET',
			dataType: 'JSON'
		}).done( lists => {
			this.setState({ lists });
		}).fail( data => {
			// TODO: handle this better!
			alert('Failed grabbing board lists.');
		});
	}

	deleteList(id) {
		$.ajax({
			url: `/boards/${this.props.boardId}/lists/${id}`,
			type: 'DELETE',
			dataType: 'JSON'
		}).done( data => {
			let lists = this.state.lists;
			let index = lists.findIndex( l => l.id === id);
			this.setState({
				lists: [ ...lists.slice(0, index), ...lists.slice(index + 1, lists.length) ]
			})
		}).fail( data => {
			// TODO: handle this better
			alert('list not deleted!');
		});
	}

	addList(e) {
		e.preventDefault();
		$.ajax({
			url: `/boards/${this.props.boardId}/lists`,
			type: 'POST',
			data: { list: { name: this.refs.name.value } },
			dataType: 'JSON'
		}).done( list => {
			this.refs.addList.reset();
			this.setState({ lists: [{...list}, ...this.state.lists ] });
		}).fail( data => {
			// TODO: Handle this better
			alert('List not saved.');
		});
	}

	updateList(id, list) {
	  $.ajax({
	    url: `/boards/${this.props.boardId}/lists/${id}`,
	    type: 'PUT',
	    dataType: 'JSON',
	    data: { list: {...list} }
	  }).done( list => {
	    let lists = this.state.lists;
	    let editList = lists.find( b => b.id === list.id);
	    editList.name = list.name;
	    this.setState({lists: lists});
	  }).fail( data => {
	    alert('list is not updated')
	  })
  }

	render() {
		let lists = this.state.lists.map( list => {
			return(<List key={`list-${list.id}`} {...list} deleteList={this.deleteList} updateList={this.updateList} />);
		});
		return(
			<div>
			  <form onSubmit={this.addList.bind(this)} ref='addList'>
			    <input type='text' ref='name' placeholder='List Name' require />
			    <input type='submit' className='btn' value='Add' />
			  </form>
			  {lists}
			</div>
		);
	}
}







