"use client";

import { authOptions } from "@/lib/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ProfileForm } from "@/components";
import { useContext } from "react";
import { AuthContext } from "@/context/auth";
import { useProfile } from "@/app/hooks";

import { IUser, IOrganization, IBusiness } from "@/interfaces";
import { NextPage } from "next";

const Profile: NextPage = () => {
  const { user } = useContext(AuthContext);
  const id = user?._id as string;

  const { userData, isLoading } = useProfile(id, {
    refreshInterval: 15 * 1000,
  });
  return (
    <>
      <ProfileForm
        userDataBusiness={userData as IBusiness}
        userDataOrg={userData as IOrganization}
        userData={userData as IUser}
      />
    </>
  );
};

export default Profile;
