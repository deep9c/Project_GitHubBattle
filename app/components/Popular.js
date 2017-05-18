var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

function RepoGrid(props) {
	return(
		<ul className='popular-list'>
			{props.repos.map(function(repo,index){
				return(
				<li key={repo.name} className='popular-item'>
					<div className='popular-rank'># {index+1}</div>
					<ul className='space-list-items'>
						<li> 
							<img className='avatar' 
								src={repo.owner.avatar_url} 
								alt={'Avatar for ' + repo.owner.login}/>
						</li>
						<li><a href={repo.html_url}>{repo.name}</a></li>
						<li>@{repo.owner.login}</li>
						<li>{repo.stargazers_count} stars</li>	
					</ul>
				</li>
				)
			})}
		</ul>
	)
}
RepoGrid.propTypes={
	repos: PropTypes.array.isRequired,
}

function SelectLanguage(props){
		var languages = ['All', 'JavaScript','Ruby','Java','CSS','Python'];
		return(
			<ul className='languages'>
				{/*<p>Selected: {this.state.selectedLanguage}</p>*/}
				{languages.map(function(language){
					return(
						<li 
							key={language}
							onClick={props.onSelect.bind(null,language)}
							style={language===props.selectedLang ? {color:'#d0021b'} : null}
							>
							{language}
						</li>
					)
				})}
			</ul>
		)
	
}

SelectLanguage.propTypes = {
	selectedLang: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
}

class Popular extends React.Component{
	constructor(props){
		super(props);
		this.state={
			selectedLanguage: 'All',
			repos: null
		};

		this.updateLanguage = this.updateLanguage.bind(this);
	}

	componentDidMount(){
		this.updateLanguage(this.state.selectedLanguage);
	}

	updateLanguage(lang){
		this.setState(function(){
			return{
				selectedLanguage: lang,
				repos: null
			}
		});

		api.fetchPopularRepos(lang)
			.then(function(repos){
				//console.log(repos)
				this.setState(function(){
					return{
						repos: repos
					}
				})

			}.bind(this));
	}

	render(){
		
		return(
			<div>
			<SelectLanguage 
				onSelect={this.updateLanguage} 
				selectedLang={this.state.selectedLanguage}/>
			{!this.state.repos 
				? <p>Loading...</p> 
				: <RepoGrid repos={this.state.repos} />
			}
			</div>
		)
	}
}

module.exports = Popular;