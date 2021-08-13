import React from 'react'
import { Link } from 'react-router-dom'
import getDateAndTime from '../utils/helpers'
import PostTitle from './PostTitle'
import PostMetaData from './ItemMetaData'
import PropTypes from 'prop-types'
import { ThemeConsumer } from '../contexts/ThemeContext'

export default function Posts({ stories }) {  
  return (
    <ThemeConsumer>
    {(value) => ( 
      <div>
        {
          stories.map((story) => {
            const { id, url, title, by, time ,descendants } = story
              return (
                  <ul key={id} className="posts">
                    <li  
                      className="post-heading"
                      key={id}
                    >
                      <PostTitle 
                        classname={`post-link-${value}`}
                        href={url}
                        title={title}
                      />
                    </li>
                    <li key={id}>
                      <PostMetaData
                        classname="post-metadata"
                        by={by}
                        time={time}
                        commentsCount={descendants}
                        id={id}
                      />
                    </li>
                  </ul>
              )  

            })
        }
      </div>
  )}  
    </ThemeConsumer>
  )
}

Posts.propTypes = {
  stories: PropTypes.object.isRequired
}


