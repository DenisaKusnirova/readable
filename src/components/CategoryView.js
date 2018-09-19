import React, { Component } from 'react'
import ListHeader from '../components/ListHeader'
import ListHeaderSmall from './ListHeaderSmall'
import { connect } from 'react-redux'
import PostDetail from './PostDetail'
import ErrorPage from './404'

class CategoryView extends Component {
  state = {
    width: window.innerWidth
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }  

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth})
  }

  render() {
    const { posts, category, categories } = this.props
    const filteredPosts = Object.keys(posts)
      .filter((post) => posts[post].category.toLowerCase() === category.toLowerCase())
    
    const categoryArray = Object.keys(categories)
      .filter((item) => categories[item].name.toLowerCase() === category.toLowerCase())

    if (categoryArray.length === 0) {
      return <ErrorPage />
    }

    return (
      <div>
        {this.state.width > 735 ? <ListHeader/> : <ListHeaderSmall />}
        <div className="posts-container">
          {filteredPosts.map((id) => {
            return (
            <div className="individual-card" key={id}>
              <PostDetail id={id} />
            </div>)
          })}
        </div>
      </div>  
    )
  }
}

const mapStateToProps = ({ posts, categories }, props) => {
  const { category } = props.match.params

  return {
    posts,
    category,
    categories
  }
}

export default connect(mapStateToProps)(CategoryView)