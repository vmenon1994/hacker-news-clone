import React from 'react'
import PropTypes from 'prop-types'
import { ThemeConsumer } from '../contexts/ThemeContext'

export default function PostTitle({ href, title, classname }){
    
    return (
        <a 
         className={classname}
         href={href}
         target='_blank'>
            {title}
        </a>
    )
}

PostTitle.propTypes = {
    href: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    classname : PropTypes.string.isRequired
}