import { 
  getComments, 
  addComment, 
  _voteOnComment,
  _deleteComment,
  _editComment
} 
from '../ReadableAPI'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const GET_DETAILS_FOR_COMMENT = 'GET_DETAILS_FOR_COMMENT'
export const ADD_NEW_COMMENT = 'ADD_NEW_COMMENT'
export const VOTE_ON_COMMENT = 'VOTE_ON_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'

const getTimestamp = () => {
  return new Date().getTime()
}

export const receiveCommentsForPost = (comments, id) => {
  return {
    type: RECEIVE_COMMENTS,
    comments,
    id
  }
}

export const handleReceiveCommentsForPost = (id) => {
  return(dispatch) => {
    return getComments(id)
      .then((comments) => dispatch(receiveCommentsForPost(comments, id)))
  }
}

// Add new comment
export const addNewComment = (comment) => {
  return {
    type: ADD_NEW_COMMENT,
    comment
  }
}

export const handleAddNewComment = (body, author, parentId) => {
  return (dispatch) => {
    return addComment({
      id: getTimestamp().toString(),
      timestamp: getTimestamp(),
      body,
      author,
      parentId
    })
    .then((comment) => {
      dispatch(addNewComment(comment))
    })
  }
}

// Vote on a comment
export const voteOnComment = (id, option, parentId) => {
  return {
    type: VOTE_ON_COMMENT,
    id,
    option,
    parentId
  }
}

export const handleVoteOnComment = (id, option, parentId) => {
  return (dispatch) => {
    return _voteOnComment(id, option)
      .then(() => dispatch(voteOnComment(id, option, parentId)))
  }
}

// Delete comment
export const deleteComment = (id, parentId) => {
  return {
    type: DELETE_COMMENT,
    id,
    parentId
  }
}

export const handleDeleteComment = (id, parentId) => {
  return (dispatch) => {
    return _deleteComment(id)
      .then(() => dispatch(deleteComment(id, parentId)))
  }
}

// Edit comment
export const editCommet = (id, timestamp, body, parentId) => {
  return {
    type: EDIT_COMMENT,
    id,
    timestamp,
    body,
    parentId
  }
}

export const handleEditComment = (id, body, parentId) => {
  return (dispatch) => {
    const timestamp = getTimestamp()
    return _editComment(id, timestamp, body)
    .then(() => dispatch(editCommet(id, timestamp, body, parentId)))
  }
}