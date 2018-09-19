import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { handleReceiveCommentsForPost, handleAddNewComment } from '../actions/comments'
import PostDetail from './PostDetail'
import Comment from './Comment'
import Header from './Header'
import ErrorPage from './404'

class PostDetailPage extends Component {
  state = {
    author: '',
    body: ''
  }

  componentDidMount() {
    this.props.handleReceiveCommentsForPost(this.props.id)
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  onFormSubmit = (e) => {
    e.preventDefault()
    const { author, body } = this.state
    this.props.handleAddNewComment(author, body, this.props.id)
    this.setState(() => ({
      author: '',
      body: ''
    }))
  }

  render() {
    const { comments, id, posts } = this.props

    if(!posts[id]) {
      return <ErrorPage />
    }

    return (
      <div>
        <Header />
        <div className="posts-container">
          <PostDetail id={id} />
          <h2>Comments:</h2>
          {Object.keys(comments).map((comment) => {
            return (
              <Comment
                parentId={id}
                key={comments[comment].id}
                author={comments[comment].author}
                body={comments[comment].body}
                voteScore={comments[comment].voteScore}
                id={comments[comment].id}
              />
            )
          })}
          <Card style={addCommentCard}>
            <form className="new-post-form" onSubmit={this.onFormSubmit}>
              <TextField
                id="with-placeholder"
                label="Username"
                margin="normal"
                value={this.state.author}
                onChange={this.handleChange('author')}
                style={{ width: '70%' }}
              />
              <TextField
                id="with-placeholder"
                label="Text"
                margin="normal"
                value={this.state.body}
                onChange={this.handleChange('body')}
                style={{ width: '70%' }}
              />
              <Button variant="outlined" style={buttonStyle} type="submit">
                Add New Comment
              </Button>
            </form>
          </Card>
        </div>
      </div>
    )
  }
}

const buttonStyle = {
  marginTop: 20,
  float: 'right'
}

const addCommentCard = {
  width: '85%',
  margin: 'auto',
  marginTop: 20,
  padding: 5,
  paddingBottom: 20,
  marginBottom: 100
}

const mapStateToProps = ({ comments, posts }, props) => {
  const { id } = props.match.params

  return {
    posts,
    id,
    comments: comments[id] || []
  }
}

export default connect(
  mapStateToProps,
  {
    handleReceiveCommentsForPost,
    handleAddNewComment,
  })
  (PostDetailPage)