import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import HomeIcon from '@material-ui/icons/Home'

const Header = () => {
  return (
    <div className="menu">
      <div className="menu-padding">
        <p className="header">Readable</p>
      </div>
      <div className="menu-padding">
        <Link to={`/`}>
          <Button variant="fab" mini color="secondary" aria-label="Add" style={{ marginLeft: '10px' }}>
            <HomeIcon />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Header