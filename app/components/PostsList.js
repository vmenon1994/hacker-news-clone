import React from 'react'
import { Link } from 'react-router-dom'
import getStories from '../utils/api'
import Posts from './Posts'
import Loading from './Loading'

export default class PostsList extends React.Component {
    
      state = {
        stories: null,
        error: null,
        loading: false
      }

    getPostList = () => {
      const { pathname } = this.props.location
      const storyType = pathname === '/' ? 'top' : 'new'
      getStories(storyType)
        .then((stories) => {
          this.setState({ stories})
          console.log(this.state.stories)
        })
        .catch((error) => { 
          this.setState({ error: error.message })
          console.log(this.state.error)
        })
    }

    isLoading = () => {
      const { error, stories } = this.state
      return !error && !stories
    }
  
    componentDidMount() {
      this.getPostList()
    }
  
  
    render() {
      const { stories, error } = this.state
      
      return (
        <div>
          {
            error && 
            <div className='center'>
              <h3 className='loader-title'>{error}</h3>
            </div>
          }
          {
            stories && 
            <Posts stories={stories}/>
          }

          {this.isLoading() &&
           <Loading text="Fetching Posts"/>
          }
        </div>
      )
        
      }
      
    }
  