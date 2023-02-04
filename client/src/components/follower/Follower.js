import React from 'react'
import Avatar from '../avatar/Avatar'
import './Follower.scss'

function Follower() {
  return (
    <div className="Follower">
        <div className="user-info">
            <Avatar/>
            <h4 className="name">Robbin</h4>
        </div>
      <h5 className="hover-link follow-link">follow</h5>
    </div>
  )
}

export default Follower
