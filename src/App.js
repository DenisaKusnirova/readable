import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CreatePost from './components/CreatePost'
import Homepage from './components/Homepage'
import PostDetailPage from './components/PostDetailPage'
import CategoryView from './components/CategoryView'
import EditCommentPage from './components/EditCommentPage'
import EditPostPage from './components/EditPostPage'
import ErrorPage from './components/404'
import { connect } from 'react-redux'
import { getInitialCategories, getInitialPosts } from './actions/shared'

class App extends Component {
  componentDidMount() {
    this.props.getInitialCategories()
    this.props.getInitialPosts()
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/posts' component={CreatePost} />
          <Route exact path='/:category/:id' component={PostDetailPage} />
          <Route exact path='/:category' component={CategoryView} />
          <Route exact path='/posts/:parentId/editcomment/:id' component={EditCommentPage} />
          <Route exact path='/posts/:id/edit' component={EditPostPage} />
          <Route component={ErrorPage}/>
        </Switch>
      </Router >
    )
  }
}

export default connect(null, { getInitialCategories, getInitialPosts })(App)