import React from 'react'
import { Link } from 'react-router-dom'
import getDateAndTime from '../utils/helpers'
import PropTypes from 'prop-types'
import { ThemeConsumer } from '../contexts/ThemeContext'



export default function ItemMetaData({ by, time, commentsCount, id, classname }){
    return (
        <ThemeConsumer>
         {(value) => (
            <p          
            className={classname}
            >
                by{' '}
                    {
                    <Link 
                    style={value === 'light' ? { color:  'rgb(0,0,7)' } : { color:  'rgb(190,190,190)' }} 
                    to={{
                            pathname: '/user',
                            search: `?id=${by}`
                        }}>
                        {by}
                    </Link>
                    }{' '}
                    on {getDateAndTime(time)} 
                    {' '}
                    {!(commentsCount===undefined) && 
                    <span>with</span>} 
                    {' '}
                    {!(commentsCount===undefined) &&
                    (<Link 
                    style={value === 'light' ? { color:  'rgb(0,0,7)' } : { color:  'rgb(190,190,190)' }} 
                    to={{
                        pathname: '/post',
                        search: `?id=${id}`, 
                    }}>
                        {commentsCount}
                    </Link>)
                    }{' '}
                    {
                        !(commentsCount===undefined) &&
                        <span>comments</span>
                    }            
            </p>
         )}
        </ThemeConsumer>
    )
}

