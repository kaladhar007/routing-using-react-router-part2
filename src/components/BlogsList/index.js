import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import BlogItem from '../BlogItem'

import './index.css'

class BlogsList extends Component {
  state = {blogsList: [], isLoading: true}

  componentDidMount() {
    this.getBlogsList()
  }

  getBlogsList = async () => {
    const blogsDataFromUrl = await fetch('https://apis.ccbp.in/blogs')
    const response = await blogsDataFromUrl.json()
    const formattedData = response.map(obj => ({
      id: obj.id,
      title: obj.title,
      imageUrl: obj.image_url,
      avatarUrl: obj.avatar_url,
      author: obj.author,
      topic: obj.topic,
    }))
    this.setState({blogsList: formattedData, isLoading: false})
  }

  render() {
    const {blogsList, isLoading} = this.state
    return (
      <div className="blog-list-container">
        {isLoading ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          blogsList.map(item => <BlogItem blogData={item} key={item.id} />)
        )}
      </div>
    )
  }
}

export default BlogsList
