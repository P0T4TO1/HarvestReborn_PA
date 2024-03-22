import { ChangePasswordForm, ResetPasswordForm } from "@/components";
import prisma from "@/lib/prisma";
import React from "react";

interface ResetPasswordPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ResetPasswordPage = async ({ searchParams }: ResetPasswordPageProps) => {
  if (searchParams.token) {
    const user = await prisma.m_user.findUnique({
      where: {
        resetPasswordToken: searchParams.token as string,
      },
    });
    if (!user) {
      return <div>Invalid token</div>;
    }

    return (
      <ChangePasswordForm resetPasswordToken={searchParams.token as string} />
    );
  } else {
    return <ResetPasswordForm />;
  }
};

export default ResetPasswordPage;
