var React = require('react');

class Battle extends React.Component{
	constructor(props){
		super(props);

		this.state={
			playerOneName: '',
			playerTwoName: '',
			playerOneImage: null,
			playerTwoImage: null
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(){
		this.setState(funtion(if, username){
			var newState = {};
			newState[id+'Name'] = username;
			newState[id+'Image'] = 'https://github.com/'+username+'.png?size=200';
		});
	}

	render(){
		return(
			<div>
				Battle!

			</div>
		)
	}


}

module.exports = Battle;