import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { 
  sortByTimestampNew, 
  sortByTimestampOld,
  sortByVotesMin,
  sortByVotesMax
} 
from '../actions/posts'

const CategoryButton = (props) => {
  return (
    <Link to={`/${props.categoryPath}`} className="link">
      <Button>{props.name}</Button>
    </Link>
  )
}

class ListHeader extends Component {
  state = {
    anchorEl: null,
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  onDateNewClick = () => {
    this.setState({ anchorEl: null })
    this.props.sortByTimestampNew()
  }

  onDateOldClick = () => {
    this.setState({ anchorEl: null })
    this.props.sortByTimestampOld()
  }

  onScoreMinClick = () => {
    this.setState({ anchorEl: null })
    this.props.sortByVotesMin()
  }

  onScoreMaxClick = () => {
    this.setState({ anchorEl: null })
    this.props.sortByVotesMax()
  }


  render() {
    const { anchorEl } = this.state

    return (
      <div className="menu">
        <div className="menu-padding">
          <Link to='/' className='link'>
           <p className="header">Readable</p>
          </Link>
        </div>
        <div className="menu-padding">
          {Object.keys(this.props.categories).map((category) => {
            return (
              <CategoryButton
                key={category}
                categoryPath={this.props.categories[category].path}
                name={this.props.categories[category].name}
              />
            )
          })}
          <Link to={`/`} className="link">
            <Button>All Posts</Button>
          </Link>
          <Button
            aria-owns={anchorEl ? 'simple-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            Sort Posts
        	</Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.onDateNewClick}>Date (newest)</MenuItem>
            <MenuItem onClick={this.onDateOldClick}>Date (oldest)</MenuItem>
            <MenuItem onClick={this.onScoreMinClick}>Score (minimum)</MenuItem>
            <MenuItem onClick={this.onScoreMaxClick}>Score (maximum)</MenuItem>
          </Menu>
          <Link to={`/posts`}>
            <Button variant="fab" mini color="secondary" aria-label="Add" style={{ marginLeft: '10px' }}>
              <AddIcon />
            </Button>
          </Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ categories }) => {
  return {
    categories
  }
}

export default withRouter(connect(mapStateToProps,
  {
    sortByTimestampNew,
    sortByTimestampOld,
    sortByVotesMin,
    sortByVotesMax
  }
)(ListHeader))