class Board extends React.Component {
	constructor(props) {
		super(props);
    this.state = { edit: false };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
	}

  toggleEdit() {
  this.setState({ edit: !this.state.edit });
  }

  updateBoard() {
  let board = { name: this.refs.name.value, description: this.refs.description.value }
  this.toggleEdit();
  this.props.updateBoard(this.props.id, board);
  }

  edit() {
    return(
      <div className="col s12 m6">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <input placeholder={this.props.name} defaultValue={this.props.name} ref="name" required={true}/>
            <input placeholder={this.props.description} defaultValue={this.props.description} ref="description" />
          </div>
          <div className="card-action">
            <button onClick={this.toggleEdit} className="btn blue">Cancel</button>
            <button onClick={this.updateBoard} className="btn">Save</button>
          </div>
       </div>
     </div>
    );
  }


	render() {
    if(this.state.edit)
      return this.edit();
    else
  		return(
  			<div>
          <div className="col s12 m6">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">{this.props.name}</span>
                <p>{this.props.description}</p>
              </div>
              <div className="card-action">
                <button className='btn blue' onClick={() => this.props.showBoard(this.props)}>Show</button>
                <button className='btn' onClick={this.toggleEdit}>Edit</button>
                <button className='btn red' onClick={() => this.props.deleteBoard(this.props.id)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
		)
	}
}