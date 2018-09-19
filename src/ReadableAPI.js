const api = "http://localhost:3001"

const headers = {
  'Accept': 'application/json',
  'Authorization': 'anything'
}

export const getAllCategories = () => {
  return fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)
}

export const getAllPosts = () => {
  return fetch(`${api}/posts`, {headers})
    .then(res => res.json())
}

export const addPost = (id, timestamp, title, body, author, category) => {
  return fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(id, timestamp, title, body, author, category)
  }).then(res => res.json())
}

export const getPost = (id) => {
  return fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json())
    .then(data => data.post)
}

export const _voteOnPost = (id, option) => {
  return fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => res.json())
}

export const _editPost = (id, title ,body) => {
  return fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({title, body})
  }).then(res => res.json())
}

export const _deletePost = (id) => {
  return fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers,
  }).then(res => res.json())
}

export const getComments = (id) => {
  return fetch(`${api}/posts/${id}/comments` , { headers })
   .then(res => res.json())
}

export const addComment = (id, timestamp, body, author, parentId) => {
  return fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( id, timestamp, body, author, parentId )
  }).then(res => res.json())
}

export const getComment = (id) => {
  return fetch(`${api}/comments/${id}`, {headers})
    .then(res => res.json())
    .then(data => data.comment)
}

export const _voteOnComment = (id, option) => {
  return fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => res.json())
}

export const _editComment = (id, timestamp, body) => {
  return fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ timestamp, body })
  })
}

export const _deleteComment = (id) => {
  return fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers
  }).then(res => res.json())
}

