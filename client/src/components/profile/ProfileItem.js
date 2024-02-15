import React from 'react'
import { Link } from 'react-router-dom'

export const ProfileItem = (props) => {
  return (
    <div className="profile bg-light">
      <img src={props.profile.user.avatar} alt="" className="round-img" />
      <div>
        <h2>{props.profile.user.name}</h2>
        <p>
          {props.profile.status} {props.profile.company && <span> at {props.profile.company}</span>}
        </p>
        <p>{props.profile.location && <span>{props.profile.location}</span>}</p>
        <Link to={`/profile/${props.profile.user._id}`} className="btn btn-primary">
            View Profile
        </Link>
      </div>
      <ul>
        {props.profile.skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check"></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  )
}
