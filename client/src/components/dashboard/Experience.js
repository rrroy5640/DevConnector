import React from "react";
import { useSelector } from "react-redux";
import useProfile from "../../hooks/useProfile";
import Moment from "react-moment";

export const Experience = () => {
  const experiences = useSelector((state) => state.profile.profile.experience);
  const isLoading = useSelector((state) => state.profile.loading);
  const { deleteExperience } = useProfile();

  const onDelete = (id) => {
    console.log(id);
    deleteExperience(id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (experiences.length === 0) {
    return <h1>No experience credentials found</h1>;
  }

  return (
    <div>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {experiences.map((experience) => (
            <tr key={experience._id}>
              <td>{experience.company}</td>
              <td className="hide-sm">{experience.title}</td>
              <td className="hide-sm">
                <Moment format="YYYY/MM/DD">{experience.from}</Moment> -{" "}
                {experience.to === null ? (
                  " Now"
                ) : (
                  <Moment format="YYYY/MM/DD">{experience.to}</Moment>
                )}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(experience._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
