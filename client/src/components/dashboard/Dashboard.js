import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useProfile from "../../hooks/useProfile";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.profile.loading);
  const profile = useSelector((state) => state.profile.profile);

  if (profile === null && isLoading) {
    return <div>Loading...</div>;
  }
  return <>
    {
        profile !== null ? (
            <>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Welcome {user && user.name}
            </p>
            {profile !== null ? (
                <>
                <div className="dash-buttons">
                    <Link to="/edit-profile" className="btn btn-light"
                    ><i className="fas fa-user-circle text-primary"></i> Edit Profile</Link>
                    <Link to="/add-experience" className="btn btn-light"
                    ><i className="fab fa-black-tie text-primary"></i> Add Experience</Link>
                    <Link to="/add-education" className="btn btn-light"
                    ><i className="fas fa-graduation-cap text-primary"></i> Add Education</Link>
                </div>
                </>
            ) : (
                <>
                <p>You have not yet setup a profile, please add some info</p>
                <Link to="/create-profile" className="btn btn-primary my-1" >
                    Create Profile
                     </Link>
                </>
            )}
            </>
        ) : (
            <>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-primary my-1" >
                Create Profile
            </Link>
            </>
        )
    }
  </>;
};