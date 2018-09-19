import { 
  addPost, 
  _voteOnPost, 
  _editPost, 
  _deletePost,
  getPost,
 } from '../ReadableAPI'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_NEW_POST = 'ADD_NEW_POST'
export const RECEIVE_SINGLE_POST = 'RECEIVE_SINGLE_POST'
export const VOTE_ON_POST = 'VOTE_ON_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const SORT_BY_TIMESTAMP_NEW = 'SORT_BY_TIMESTAMP_NEW'
export const SORT_BY_TIMESTAMP_OLD = 'SORT_BY_TIMESTAMP_OLD'
export const SORT_BY_VOTES_MAX = 'SORT_BY_VOTES_MAX'
export const SORT_BY_VOTES_MIN = 'SORT_BY_VOTES_MIN'

const getTimestamp = () => {
  return new Date().getTime()
}

export const receivePosts = (posts) => {
  return {
    type: RECEIVE_POSTS,
    posts
  }
}

// Get a single post
export const receivePost = (id) => {
  return {
    type: RECEIVE_SINGLE_POST,
    id
  }
}

export const handleReceivePost = (id) => {
  return (dispatch) => {
    return getPost(id)
      .then(() => dispatch(receivePost(id)))
  }
}

// Add a new post
export const addNewPost = (post) => {
  return {
    type: ADD_NEW_POST,
    post
  }
}

export const handleAddNewPost = (title, body, author, category) => {
  return (dispatch) => {
    return addPost({
      timestamp: getTimestamp(),
      id: getTimestamp().toString(),
      title,
      body,
      author,
      category
    })
      .then((post) => dispatch(addNewPost(post)))
  }
}

// Vote on post
export const voteOnPost = (id, option) => {
  return {
    type: VOTE_ON_POST,
    id,
    option
  }
}

export const handleVoteOnPost = (id, option) => {
  return (dispatch) => {
    return _voteOnPost(id, option)
      .then(() => dispatch(voteOnPost(id, option)))
  }
}

// Edit post
export const editPost = (id, title, body) => {
  return {
    type: EDIT_POST,
    id,
    title,
    body
  }
}

export const handleEditPost = (id, title, body) => {
  return (dispatch) => {
    return _editPost(id, title, body)
      .then(() => dispatch(editPost(id, title, body)))
  }
}

// Delete post
export const deletePost = (id) => {
  return {
    type: DELETE_POST,
    id
  }
}

export const handleDeletePost = (id) => {
  return (dispatch) => {
    return _deletePost(id)
      .then(() => dispatch(deletePost(id)))
  }
}

// Sort by timestamp
export const sortByTimestampNew = () => {
  return {
    type: 'SORT_BY_TIMESTAMP_NEW'
  }
}

export const sortByTimestampOld = () => {
  return {
    type: 'SORT_BY_TIMESTAMP_OLD'
  }
}

// Sort by votes
export const sortByVotesMax = () => {
  return {
    type: 'SORT_BY_VOTES_MAX'
  }
}

export const sortByVotesMin = () => {
  return {
    type: 'SORT_BY_VOTES_MIN'
  }
}