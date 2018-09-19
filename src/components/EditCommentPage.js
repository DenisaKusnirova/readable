import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'
import Header from './Header'
import { handleEditComment } from '../actions/comments'

class EditCommentPage extends Component {
  state = {
    body: this.props.body
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  onFormSubmit = (e) => {
    e.preventDefault()
    const { id, parentId } = this.props
    const { body } = this.state
    this.props.handleEditComment(id, body, parentId)
    this.props.history.goBack()
  }

  render() {    
    return (
      <div>
        <Header />
        <div className="posts-container">
          <Card>
            <div className="card-content">
              <p className="header" style={{ paddingLeft: 20 }}>Edit comment</p>
              <form className="new-post-form" onSubmit={this.onFormSubmit}>
                <TextField
                  id="standard-name"
                  label="Text"
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

const mapStateToProps = ({ comments }, props) => {
  const parentId = props.match.params.parentId
  const id =  props.match.params.id

  return {
    id,
    parentId,
    body: comments[parentId][id].body
  }
}

export default connect(mapStateToProps, { handleEditComment })(EditCommentPage)