import React from "react";
import { useSelector } from "react-redux";
import useProfile from "../../hooks/useProfile";
import Moment from "react-moment";

export const Education = () => {
  const educations = useSelector((state) => state.profile.profile.education);
  const isLoading = useSelector((state) => state.profile.loading);
  const { deleteEducation } = useProfile();

  const onDelete = (id) => {
    console.log(id);
    deleteEducation(id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if(educations.length === 0) {
    return <h1>No education credentials found</h1>
  }

  return (
    <div>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {educations.map((education) => (
            <tr key={education._id}>
              <td>{education.school}</td>
              <td className="hide-sm">{education.degree}</td>
              <td className="hide-sm">
                <Moment format="YYYY/MM/DD">{education.from}</Moment> -{" "}
                {education.to === null ? (
                  " Now"
                ) : (
                  <Moment format="YYYY/MM/DD">{education.to}</Moment>
                )}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(education._id)}
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
