import React, { useEffect } from "react";
import useProfile from "../../hooks/useProfile";
import { useSelector } from "react-redux";
import { ProfileItem } from "./ProfileItem";

export const Profiles = () => {
  const { getProfiles } = useProfile();
  useEffect(() => {
    getProfiles();
  }, []);

  const profiles = useSelector((state) => state.profile.profiles);

  if (profiles.length === 0) {
    return <h4>No profiles found...</h4>;
  }
  return (
    <div>
      {profiles.map((profile) => (
        <ProfileItem key={profile._id} profile={profile} />
      ))}
    </div>
  );
};
