import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import Header from './Header'
import { handleEditPost } from '../actions/posts'

class EditPostPage extends Component {
  state = {
    title: this.props.post.title,
    body: this.props.post.body,
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  onFormSubmit = (e) => {
    e.preventDefault()
    const { title, body } = this.state
    this.props.handleEditPost(this.props.post.id, title, body)
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <Header />
        <div className="posts-container">
          <Card>
            <div className="card-content">
              <p className="header" style={{ paddingLeft: 20 }}>Edit post</p>
              <form className="new-post-form" onSubmit={this.onFormSubmit}>
                <TextField
                  id="standard-name"
                  label="Post Title"
                  value={this.state.title}
                  onChange={this.handleChange('title')}
                  margin="normal"
                  style={{ width: '70%' }}
                />
                <TextField
                  id="standard-name"
                  label="Body Text"
                  value={this.state.body}
                  onChange={this.handleChange('body')}
                  margin="normal"
                  style={{ width: '70%' }}
                />
                <Button variant="outlined" type="submit" style={{marginTop: 30}}>
                  Save Changes
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ posts }, props) => {
  const { id } = props.match.params

  return {
    posts,
    id,
    post: posts[id]
  }
}

export default connect(mapStateToProps, { handleEditPost })(EditPostPage)