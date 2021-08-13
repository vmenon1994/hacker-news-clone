import React from 'react'
import Posts from './Posts'
import { getUser, getUserStories } from '../utils/api'
import queryString from 'query-string'
import getDateAndTime from '../utils/helpers'
import Loading from './Loading'
import PropTypes from 'prop-types'
import { ThemeConsumer } from '../contexts/ThemeContext'


const boldStyle = {
    "fontWeight": "600"
}
  
export default class UserDetails extends React.Component {
    
    state = {
        user:null,
        stories: null,
        error: null
    }

    componentDidMount(){
        this.getUserAndPosts()

    }

    isUserLoading = () => {
        const {error, user} = this.state
        return !error && !user
    }

    isPostsLoading = () => {
        const {error, user, stories} = this.state
        return !error && user && !stories
    }

    getUserAndPosts = () => {
        const parsed = queryString.parse(this.props.location.search);
        const id = parsed.id
        getUser(id)
            .then((user) => {
                this.setState({ user })
                return getUserStories(user.submitted)
            })
            .then((stories) => {
                console.log(stories)
                this.setState({stories})
            })
            .catch((error) => this.setState({ error: error.message }))
    }

    render() {
        const {user, stories, error} = this.state
        if(error) {
            return(
                <div className='center'>
                    <h3 className='loader-title'>{error}</h3>
                </div>
            )
        }
        return (
            
            <ThemeConsumer>
                {(value) => (
                    <div>
                        {this.isUserLoading() &&
                            <Loading text="Fetching User Details" />
                        }
                    {user && 
                    <Userdetails  
                        user={user}
                    />
                    }
                    
                    
                    {this.isPostsLoading() &&
                        <Loading text="Fetching Posts" />
                        }
                    {stories &&

                        <h2 className={`posts-header-${value}`}>Posts</h2>
                    }
                    {stories &&
                        
                        <Posts stories={stories} />

                    }
                </div> 
                )}
                
            </ThemeConsumer>
        )
    }
}

function Userdetails({user}){
    const {created, about, id, karma} = user
    return(
        <ThemeConsumer>
        {(value) => (
            <div>
            <h1 className={`username-header-${value}`}>{id}</h1>
            <ul className="user-metadata-container">
                <li>
                    joined
                </li>
                <li style={boldStyle}>
                    {` ${getDateAndTime(created)} `}
                </li>   
                <li>
                    has 
                </li>
                <li style={boldStyle}>
                    {` ${karma.toLocaleString()} `}
                </li>
                <li>
                    karma
                </li>
            </ul>
            <div 
            dangerouslySetInnerHTML={{__html: about}} 
            className={`user-about-${value}`}
            />   

        </div>
        )}
            
        </ThemeConsumer>
    )
}


Userdetails.propTypes = {
    user: PropTypes.object.isRequired   
}