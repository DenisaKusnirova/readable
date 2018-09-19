import { 
  RECEIVE_POSTS, 
  ADD_NEW_POST,
  RECEIVE_SINGLE_POST,
  VOTE_ON_POST,
  EDIT_POST,
  DELETE_POST,
  SORT_BY_TIMESTAMP_NEW,
  SORT_BY_TIMESTAMP_OLD,
  SORT_BY_VOTES_MAX,
  SORT_BY_VOTES_MIN
} from '../actions/posts'

export const postsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        ...action.posts.reduce((posts, item) => {
          posts[item.id] = item
          return posts
        }, {})
      }
    case RECEIVE_SINGLE_POST:
      return Object.keys(state).filter((post) => post.id === action.id)
    case ADD_NEW_POST:
      return {
        ...state,
        [action.post.id]: action.post
      }
    case VOTE_ON_POST:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: action.option === 'upVote' 
            ? state[action.id].voteScore + 1 
            : state[action.id].voteScore - 1
        }
      }
    case EDIT_POST:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          title: action.title,
          body: action.body
        }
      }
    case DELETE_POST:
      const { [action.id]: {}, ...newState } = state
      return newState
    case SORT_BY_TIMESTAMP_NEW:
      return Object.keys(state)
        .sort((a, b) => state[b].timestamp - state[a].timestamp)
        .reduce((posts, postId) => {
          posts[postId] = state[postId]
          return posts
        }, {})
      case SORT_BY_TIMESTAMP_OLD:
        return Object.keys(state)
          .sort((a, b) => state[a].timestamp - state[b].timestamp)
          .reduce((posts, postId) => {
            posts[postId] = state[postId]
            return posts
        }, {})
    case SORT_BY_VOTES_MIN:
      return Object.keys(state)
        .sort((a, b) => state[a].voteScore - state[b].voteScore)
        .reduce((posts, postId) => {
          posts[postId] = state[postId]
          return posts
        }, {})
    case SORT_BY_VOTES_MAX:
      return Object.keys(state)
        .sort((a, b) => state[b].voteScore - state[a].voteScore)
        .reduce((posts, postId) => {
          posts[postId] = state[postId]
          return posts
        }, {})
    default:
      return state
  }
}

