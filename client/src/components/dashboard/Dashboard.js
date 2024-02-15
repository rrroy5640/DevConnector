import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useProfile from "../../hooks/useProfile";
import { Link } from "react-router-dom";
import { Experience } from "./Experience";
import { Education } from "./Education";

export const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.profile.loading);
  const profile = useSelector((state) => state.profile.profile);

  const { deleteAccount } = useProfile();

  const { getProfile } = useProfile();

  useEffect(() => {
    getProfile();
  },[]);

  const onDeleteAccount = () => {
    console.log("Delete account");
    if (window.confirm("Are you sure? This can NOT be undone!")) {
      deleteAccount();
    }
    //deleteAccount();
  };

  if (profile === null && isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>
          <Link to="/edit-profile" className="btn btn-light">
            <i className="fas fa-user-circle text-primary"></i> Edit Profile
          </Link>

          <Link to="/add-experience" className="btn btn-light">
            <i className="fab fa-black-tie text-primary"></i> Add Experience
          </Link>

          <Link to="/add-education" className="btn btn-light">
            <i className="fas fa-graduation-cap text-primary"></i> Add Education
          </Link>

          <Experience />
          <Education />
          <div className="my-2">
            <button className="btn btn-danger" onClick={onDeleteAccount}>
              Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      )}
    </>
  );
};
