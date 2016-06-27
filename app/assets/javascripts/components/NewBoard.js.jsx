class NewBoard extends React.Component {
	constructor(props) {
		super(props);
	}

	addBoard(e) {
		// prevent default form submit from happening
		e.preventDefault();
		// make ajax call to create a new board
		let name = this.refs.name.value;
		let description = this.refs.description.value;
		$.ajax({
			url: '/boards',
			type: 'POST',
			data: { board: { name, description } },
			dataType: 'JSON'
		}).done( board => {
			this.props.addBoard(board);
			this.refs.addForm.reset();
		}).fail( response => {
			alert(response.errors.toString());
		});
	}

	render() {
		return(
			<div className='col s12 m10 offset-m1'>
			  <h4>Add New Board</h4>
			  <form ref='addForm' onSubmit={this.addBoard.bind(this)}>
			    <input type='text' placeholder='Board Name' ref='name' required />
			    <textarea placeholder='Board Description' ref='description'></textarea>
			    <input type='submit' className='btn' />
			  </form>
			</div>
		)
	}
}