import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListHeader from './ListHeader'
import ListHeaderSmall from './ListHeaderSmall'
import PostDetail from './PostDetail'
import { getInitialCategories, getInitialPosts } from '../actions/shared'

class Homepage extends Component {
  state = {
    width: window.innerWidth
  }
  componentDidMount() {
    this.props.getInitialCategories()
    this.props.getInitialPosts()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }  

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth})
  }

  render() {
    return (
      <div>
        {this.state.width > 735 ? <ListHeader/> : <ListHeaderSmall />}
        <div className="posts-container">
          {this.props.postIds.map((id) => {
            return (
              <div className="individual-card" key={id}>
                <PostDetail id={id} />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ posts }) => {
  const postIds = Object.keys(posts)
  return {
    postIds
  }
}

export default connect(mapStateToProps, { getInitialCategories, getInitialPosts })(Homepage)
