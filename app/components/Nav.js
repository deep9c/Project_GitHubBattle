var React = require('react');

//var Link = require('react-router-dom').Link;
var NavLink = require('react-router-dom').NavLink; //link highlighted accrdance to URL

function Nav(){
	return(
		<ul className='nav'>
			<li>
				<NavLink exact activeClassName='active' to='/'>
					Home
				</NavLink>
			</li>
			<li>
				<NavLink activeClassName='active' to='/battle'>
					Batte
				</NavLink>
			</li>
			<li>
				<NavLink activeClassName='active' to='/popular'>
					Popular
				</NavLink>
			</li>
		</ul>
	)
}

module.exports = Nav;