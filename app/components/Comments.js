import React from 'react'
import { ThemeConsumer } from '../contexts/ThemeContext'
import ItemMetaData from './ItemMetaData'

export default function Comments({ comments }){

    return(
        <ThemeConsumer>
        {(value) => (
            <div>
                <ul>
                {comments.map((comment, index) => (
                    <ul className={`comments-${value}`}
                        key={index}>
                        <li key={comment.id}>
                            <ItemMetaData 
                            by={comment.by}
                            time={comment.time}
                            classname="commenter-detail"
                            />
                        </li>
                        <li key={comment.id}>
                            <div 
                            dangerouslySetInnerHTML={{__html:comment.text}} 
                            className={`commenter-detail-${value}`}
                            />
                        </li>
                    </ul>
                    ))} 
                </ul>
            </div>
        )}
       </ThemeConsumer>
       )}