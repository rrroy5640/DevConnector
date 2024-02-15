import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProfile from "../../hooks/useProfile";
import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import { ProfileHead } from "./ProfileHead";
import { ProfileAbout } from "./ProfileAbout";
import { ProfileExp } from "./ProfileExp";
import { ProfileEdu } from "./ProfileEdu";
import { ProfileGithub } from "./ProfileGithub";

export const ProfilePage = () => {
  const { id } = useParams();
  const { getProfileById, getRepos } = useProfile();

  const profile = useSelector((state) => state.profile.profile);
  const repos = useSelector((state) => state.profile.repos);

  useEffect(() => {
    const loadProfile = async () => {
      await getProfileById(id);
    };
  
    loadProfile();
  }, [id]);
  
  useEffect(() => {
    if (profile?.githubusername) {
      getRepos(profile.githubusername);
    }
  }, [profile?.githubusername]);



  if (profile === null) {
    return <div>Loading...</div>;
  }
  return (
    <>
        <Link to="/profiles" className="btn btn-light">
            Back To Profiles
        </Link>
        <div className="profile-grid my-1">
            <ProfileHead profile={profile} />
            <ProfileAbout profile={profile} />
            <ProfileExp profile={profile} />
            <ProfileEdu profile={profile} />
        </div>
        {profile.githubusername && <ProfileGithub/>}
        
    </>
  );
};