import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleVoteOnComment, handleDeleteComment } from '../actions/comments'

class Comment extends Component {
  downVote = () => {
    this.props.handleVoteOnComment(this.props.id , 'downVote', this.props.parentId)
  }

  upVote = () => {
    this.props.handleVoteOnComment(this.props.id , 'upVote', this.props.parentId)
  }

  deleteComment = () => {
    this.props.handleDeleteComment(this.props.id, this.props.parentId)
  }

  render() {
    const { id, parentId } = this.props

    return (
      <Card style={cardStyle}>
        <div className="comment">
          <div>
            <p>{this.props.author}</p>
            <h4>{this.props.body}</h4>
          </div>
          <div className="buttons">
            <div className="button-div">
              <button onClick={this.downVote}>
                <FontAwesomeIcon icon="thumbs-down" style={style}/>
              </button>
              <button onClick={this.upVote}>
                <FontAwesomeIcon icon="thumbs-up" style={style}/>
              </button>
              {this.props.voteScore}
            </div>
            <Link to={`/posts/${parentId}/editcomment/${id}`}>
              <button className="button-div">
                <FontAwesomeIcon icon="edit" style={style} />
              </button>
            </Link>
            <button className="button-div" onClick={this.deleteComment}>
              <FontAwesomeIcon icon="trash" style={style} />
            </button>
          </div>
        </div>
      </Card>
    )
  } 
}

const style = {
  width: 16,
  height: 16,
  padding: 6
}

const cardStyle = {
  width: '80%',
  padding: 20,
  margin: 'auto',
  marginBottom: 12
}


export default connect(null, { handleVoteOnComment, handleDeleteComment })(Comment)