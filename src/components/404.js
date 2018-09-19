import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className="errorPage-msg">
      <p> Sorry, the page could not be found.</p>
      <Link to="/">Go back to homepage.</Link>
    </div>
    )
}

export default ErrorPage