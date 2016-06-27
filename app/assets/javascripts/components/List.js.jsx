class List extends React.Component {
	constructor(props) {
		super(props);
		this.state = { items: [], edit: false };
		this.toggleEdit = this.toggleEdit.bind(this);
		this.updateList = this.updateList.bind(this);
		this.addItem = this.addItem.bind(this); 
	}

	componentDidMount() {
		$.ajax({
			url: '/items',
			type: 'GET',
			data: { list_id: this.prop.id}
		}).done( items => {
			this.setState({ items: items})
		})
	}

	addItem(e) {
		e.preventDefault();
		let name = this.refs.name
		$.ajax({
			url: '/items',
			type: 'POST',
			data: { list_id: this.props.id, item: { name: name.value}},
			dataType: 'JSON'
		}).done( item => {
			this.refs.addItem.reset();
			this.setState({ items: [{...item}, ...this.state.items] });
		}).fail( data => {
			alert('Item not saved')
		})
	}

	componentWillMount() {
		// TODO: make ajax call to grab all the lists items
		// on success - set state of all the items
	}

	toggleEdit() {
		this.setState({ edit: !this.state.edit});
	}

	updateList() {
		let list = { name: this.refs.name.value };
		this.toggleEdit();
		this.props.updateList(this.props.id, list);
	}

	edit() {
    return(
      <div>
        <input placeholder={this.props.name} defaultValue={this.props.name} ref='name' />
        <button onClick={this.toggleEdit}>Cancel</button>
        <button onClick={this.updateList}>Save</button>
     </div>
    );
  }

	render() {
		let items = this.state.items.map( card => {
			return(
			  <li key={`item-${item.id}`} className="collection-item">
			    <div>{item.name}
			    </div>
			  </li>
			  );
			});
		
		if(this.state.edit)
			return this.edit();
		else

		return(
			<div>
			  <h5	>{this.props.name}</h5>
			  <button className='btn red' onClick={() => this.props.deleteList(this.props.id)}>Delete</button>
			  <button className='btn' onClick={ this.toggleEdit }>Edit</button>
			  <hr />
			<div className="col s12 m3">
			      <form onSubmit={this.addItem}>
			        <input placeholder="name" ref="name" />
			        <button className="btn" type="submit">Add Item</button>
			     </form>
			     <h5 className="center">{this.props.name}</h5>
			     <ul className="collection">
			      {/*{ cards }*/}
			     </ul>
			   </div>
			</div>
		);
	}
}