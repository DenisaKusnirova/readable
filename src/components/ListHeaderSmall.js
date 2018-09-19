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

// const CategoryButton = (props) => {
//   return (
//     <Link to={`/${props.categoryPath}`} className="link">
//       <Button>{props.name}</Button>
//     </Link>
//   )
// }

class ListHeaderSmall extends Component {
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
      <div className="menu-small">
        <div className="menu-padding-small">
          <Link to="/" className="link">
            <p className="header-small">Readable</p>
          </Link>
        </div>
        <div className="menu-padding-small">
          <Button
            aria-owns={anchorEl ? 'simple-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            Menu
        	</Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <Link to={`/react`} className="link">
              <MenuItem onClick={this.onDateNewClick}>
                REACT
              </MenuItem>
            </Link>
            <Link to={`/redux`} className="link">
              <MenuItem onClick={this.onDateNewClick}>
                REDUX
              </MenuItem>
            </Link>
            <Link to={`/udacity`} className="link">
              <MenuItem onClick={this.onDateNewClick}>
                UDACITY
              </MenuItem>
            </Link>
            <MenuItem onClick={this.onDateNewClick}>Sort by Date (newest)</MenuItem>
            <MenuItem onClick={this.onDateOldClick}>Sort by Date (oldest)</MenuItem>
            <MenuItem onClick={this.onScoreMinClick}>Sort by Score (minimum)</MenuItem>
            <MenuItem onClick={this.onScoreMaxClick}>Sort by Score (maximum)</MenuItem>
          </Menu>
          <Link to={`/posts`}>
            <Button variant="fab" mini color="secondary" aria-label="Add" style={{ marginLeft: '8px' }}>
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
)(ListHeaderSmall))