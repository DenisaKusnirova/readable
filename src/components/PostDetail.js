import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { handleDeletePost, handleVoteOnPost } from '../actions/posts'

class PostDetail extends Component {
  getDateFormat(date) {
    let d = new Date(date)
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    let year = d.getFullYear()

    if (month.length < 2)
      month = '0' + month
    if (day.length < 2)
      day = '0' + day
    date = new Date()
    date.toLocaleDateString()

    return [day, month, year].join('-')
  }

  upVote = () => {
    this.props.handleVoteOnPost(this.props.post.id, 'upVote')
  }

  downVote = () => {
    this.props.handleVoteOnPost(this.props.post.id, 'downVote')
  }

  deletePost = () => {
    this.props.handleDeletePost(this.props.post.id)
  }

  render() {
    const { author, timestamp, title, body, commentCount, voteScore, id, category } = this.props.post
    
    return (
      <Card>
        <div className="card-content">
          <div>
            <p>{author} {this.getDateFormat(timestamp)}</p>
            <Link to={`/${category}/${id}`} className="link">
              <h3>{title}</h3>
            </Link>
            <p>{body}</p>
          </div>
          <div className="buttons">
            <div className="button-div">
              <FontAwesomeIcon icon="comment" style={style} />
              {commentCount}
            </div>
            <div className="button-div">
              <button onClick={this.downVote}>
                <FontAwesomeIcon icon="thumbs-down" style={style} />
              </button>
              <button onClick={this.upVote}>
                <FontAwesomeIcon icon="thumbs-up" style={style} />
              </button>
              {voteScore}
            </div>
            <Link to={`/posts/${id}/edit`}>
              <button className="button-div">
                <FontAwesomeIcon icon="edit" style={style} />
              </button>
            </Link>
            <button className="button-div" onClick={this.deletePost}>
              <FontAwesomeIcon icon="trash" style={style}/>
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

const mapStateToProps = ({ posts }, { id }) => {
  const post = posts[id]
  return {
    post,
    id
  }
}

export default withRouter(connect(mapStateToProps, { handleDeletePost, handleVoteOnPost })(PostDetail))