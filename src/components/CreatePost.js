import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import { handleAddNewPost } from '../actions/posts'
import { connect } from 'react-redux'
import Header from './Header';

class CreatePost extends Component {
  state = {
    author: "",
    title: "",
    body: "",
    category: "",
    error: ""
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  onFormSubmit = (e) => {
    e.preventDefault()
    const { author, category, title, body } = this.state
    if (!author || !title || !body) {
      this.setState(() => ({
        error: 'Please fill in all the fields before submiting.'
      }))
    } else {
      this.props.handleAddNewPost(title, body, author, category)
      this.setState(() => ({
        author: '',
        title: '',
        body: ''
      }))
      this.props.history.push('/')
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="posts-container">
          <Card>
            <div className="card-content">
              <p className="sub-header" style={{ paddingLeft: 20 }}>Create a new post</p>
              <form className="new-post-form" onSubmit={this.onFormSubmit}>
                <TextField
                    id="standard-name"
                    label="Author"
                    value={this.state.author}
                    onChange={this.handleChange('author')}
                    margin="normal"
                    style={{ width: '70%' }}
                  />
                <TextField
                    id="standard-name"
                    label="Title of a new post"
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
                <FormControl required style={style}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    native
                    value={this.state.category}
                    onChange={this.handleChange('category')}
                    name="age"
                    inputProps={{
                      id: 'age-native-required',
                    }}
                  >
                    <option value="" />
                    <option>React</option>
                    <option>Redux</option>
                    <option>Udacity</option>
                  </Select>
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
                <div className="error-message">
                 {this.state.error !== '' && this.state.error}
                </div>
                <Button variant="outlined" type="submit">Submit</Button>
              </form>
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

const style = {
  width: 200,
  paddingBottom: 26
}

export default connect(null, { handleAddNewPost })(CreatePost)