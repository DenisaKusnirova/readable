import { 
  RECEIVE_COMMENTS, 
  ADD_NEW_COMMENT,
  VOTE_ON_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT
} 
from '../actions/comments'

export const commentsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return {
        ...state,
        [action.id]: action.comments.reduce((comments, comment) => {
          comments[comment.id] = comment
          return comments
        }, {})
      }
    case ADD_NEW_COMMENT:
      return {
        ...state,
        [action.comment.parentId]: {
          ...state[action.comment.parentId],
          [action.comment.id]: action.comment
        }
      }
    case VOTE_ON_COMMENT:
      return {
        ...state,
        [action.parentId]: {
          ...state[action.parentId],
          [action.id]: {
            ...state[action.parentId][action.id],
            voteScore: action.option === 'upVote' 
            ? state[action.parentId][action.id].voteScore + 1 
            : state[action.parentId][action.id].voteScore - 1
          }
        }
      }
    case DELETE_COMMENT:
      const { [action.parentId]: { [action.id]: {}, ...newComments }} = state
      return {
        ...state,
        [action.parentId]: newComments
      }
    case EDIT_COMMENT:
      return {
        ...state,
        [action.parentId]: {
          ...state[action.parentId],
          [action.id]: {
            ...state[action.parentId][action.id],
            body: action.body,
            timestamp: action.timestamp
          }
        }
      }
    default:
      return state
  }
}