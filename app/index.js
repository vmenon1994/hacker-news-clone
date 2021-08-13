import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Loading from './components/Loading'
import {ThemeProvider} from './contexts/ThemeContext'

const PostsList = React.lazy(() => import('./components/PostsList'))
const PostDetails = React.lazy(() => import('./components/PostDetails'))
const UserDetails = React.lazy(() => import('./components/UserDetails'))

class App extends React.Component {
  state = {
    mode: 'light'
  }

  toggleSiteTheme = () => {
    this.setState((state) => {
      return {mode: state.mode === 'light' ? 'dark' : 'light'}
    })
  }

  render() {
    const {mode} = this.state
    return (
      <Router>
      <div className={mode}>
        <div className="container">
          <ThemeProvider value={mode}>
            <Nav mode={mode} toggleSiteTheme= {this.toggleSiteTheme}/>
            <React.Suspense fallback={ <Loading/> }> 
              <Switch>
                <Route key ="top" exact path="/" component={PostsList} />
                <Route key ="new" exact path="/new" component={PostsList} />
                <Route exact path="/post" component={PostDetails} />
                <Route exact path="/user" component={UserDetails} />
                <Route component={() => (<h1>Error 404</h1>) } />
              </Switch>
            </React.Suspense>
          </ThemeProvider>
        </div>
      </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
