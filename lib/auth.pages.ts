import { auth } from "@/auth";
import { NextApiRequest } from "next";

export const currentUserInPages = async (req: NextApiRequest) => {
  const session = await auth();

  return session?.user;
};

export const currentRoleInPages = async () => {
  const session = await auth();

  return session?.user?.role;
};
