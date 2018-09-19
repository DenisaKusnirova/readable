import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import middleware from './middleware'
import reducer from './reducers/index'
import App from './App'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faComment, faThumbsUp, faThumbsDown, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faComment, faThumbsUp, faThumbsDown, faEdit, faTrash)

const store = createStore(reducer, middleware)

ReactDOM.render(
  <Provider store={store}>
   <App />
  </Provider>, 
document.getElementById('root'))