import { Component } from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import Layout from './containers/Layout';

class App extends Component {
  render(){
    return (
      <Router>
        <Switch>
          <Route
           path="/"
           name="Home"
           component={(props) => <Layout {...props} />}
          />
        </Switch>
      </Router>
    )
  }
}

export default App