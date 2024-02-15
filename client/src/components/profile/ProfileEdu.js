import React from "react";
import moment from "moment";

export const ProfileEdu = ({ profile }) => {
  const { education } = profile;
  return (
    <div className="profile-edu bg-white p-2">
      <h2 className="text-primary">Education</h2>
      {education.map((edu, index) => (
        <div key={index}>
          <h3>{edu.school}</h3>
          <p>
            {edu.degree} - {edu.fieldofstudy}
          </p>
          <p>
            {moment(edu.from).format("YYYY/MM/DD")} -{" "}
            {edu.to ? moment(edu.to).format("YYYY/MM/DD") : "Now"}
          </p>
          <p>
            <strong>Degree: </strong>
            {edu.degree}
          </p>
          <p>
            <strong>Field Of Study: </strong>
            {edu.fieldofstudy}
          </p>
          <p>
            <strong>Description: </strong>
            {edu.description}
          </p>
        </div>
      ))}
    </div>
  );
};
