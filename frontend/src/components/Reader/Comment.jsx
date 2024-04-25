import React from 'react'
import './Comment.css'

export const Comment = ({ name, comment }) => {
    return (
        <div className='comment'>

            <span class="flex-shrink-0"><img class="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></span>
            <div className="ms-3 ">
                <div className="fw-bold">{name}</div>
                {comment}
            </div>
        </div>

    )
}
