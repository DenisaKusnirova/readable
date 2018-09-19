import { getAllCategories, getAllPosts } from '../ReadableAPI'
import { receiveCategories } from './categories'
import { receivePosts } from './posts'

export const getInitialCategories = () => {
  return (dispatch) => {
    return getAllCategories()
      .then((categories) => dispatch(receiveCategories(categories)))
  }
}

export const getInitialPosts = () => {
  return (dispatch) => {
    return getAllPosts()
      .then((posts) => dispatch(receivePosts(posts)))
  }
}