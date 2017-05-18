var React = require('react');
var Popular = require('./Popular');
var Battle = require('./Battle');
var Nav = require('./Nav');
var Home = require('./Home');
var Results = require('./Results');

var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

class App extends React.Component {
  render() {
    return (
    	<Router>
    		<div className='container'>
          <Nav/>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/popular' component={Popular}/>
            <Route exact path='/battle' component={Battle}/>
            <Route path='/battle/results' component={Results}/>
            <Route render={function(){
              return(
                <p>Not found</p>
              )
            }}/>
          </Switch>
          
      		{/*<Popular/>*/}
      	</div>
    	</Router>

      
    )
  }
}

module.exports = App;
