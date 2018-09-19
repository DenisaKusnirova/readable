import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div>
      <p className="errorPage-msg">
        Sorry, the page could not be found. <br/>
        <Link to="/">
        Go back to homepage.</Link>
      </p>
    </div>
    )
}

export default ErrorPage