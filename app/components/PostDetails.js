import React from 'react'
import PostTitle from './PostTitle'
import PostMetaData from './ItemMetaData'
import Comments from './Comments'
import { getItem, getStoryComments } from '../utils/api' 
import queryString from 'query-string'
import Loading from './Loading'
import PropTypes from 'prop-types'
import { ThemeConsumer } from '../contexts/ThemeContext'

export default class PostDetails extends React.Component { 
    state = {
        story: null,
        comments: null,
        error: null,
    }

    getStoryAndComments = () => {
        const parsed = queryString.parse(this.props.location.search);
        const id = parsed.id
        getItem(id)
            .then((story) => {
                this.setState({ story })
                return getStoryComments(story)
            })
            .then((comments) => this.setState({comments}))
            .catch((error) => this.setState({error: error.message}))
    }

    componentDidMount(){
        this.getStoryAndComments()

    }

    isPostLoading = () => {
        const {error, story} = this.state
        return !error && !story
    }

    isCommentsLoading = () => {
        const {error, story, comments} = this.state
        return !error && story && !comments
    }

    render(){
        const { story, comments, error } = this.state
        if(error) {
            return(
                <div className='center'>
                    <h3 className='loader-title'>{error}</h3>
                </div>
            )
        }
        return(
            <ThemeConsumer>
            {(value) => (
                <div className="post-details">
                    {this.isPostLoading() &&
                    <Loading text="Fetching Posts" />
                    }
                    {story &&
                    <PostTitle 
                    title={story.title}
                    href={story.url}
                    classname={`post-link-${value} large`}
                    />
                    }
                    
                    {story &&
                        <PostMetaData 
                        by={story.by} 
                        time={story.time} 
                        id={story.id}
                        commentsCount={story.descendants}
                        classname={`post-detail-${value} post-detail-large `}/>
                        
                    }
                    {this.isCommentsLoading() &&
                        <Loading text="Fetching Comments" />
                    }
                    {
                    comments && 
                    <Comments 
                    comments={comments}
                    />
                    }
                    
                </div>
            )}
                
            </ThemeConsumer>
        )
        
    }
}