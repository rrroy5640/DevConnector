import React from 'react'
import moment from 'moment'

export const ProfileExp = ({profile}) => {
  return (
    <div className="profile-exp bg-white p-2">
      <h2 className="text-primary">Experience</h2>
      {profile.experience.map((exp, index) => (
        <div key={index}>
          <h3 className="text-dark">{exp.company}</h3>
          <p>
            {moment(exp.from).format('YYYY/MM/DD')} - {exp.to ? moment(exp.to).format('YYYY/MM/DD') : 'Now'}
          </p>
          <p>
            <strong>Position: </strong>{exp.title}
          </p>
          <p>
            <strong>Description: </strong>{exp.description}
          </p>
        </div>
      ))}
    </div>
  )
}
