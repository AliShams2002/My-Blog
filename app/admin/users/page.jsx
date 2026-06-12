import Skeleton from "@/components/admin/SkeletonLoading";
import { getAllUsers } from "@/services/UserService";
import React from "react";
import UserClient from "./_partials/UserClient";

export const dynamic = "force-dynamic";
const Page = async () => {
  const users = await getAllUsers();

  if (!users) return <Skeleton />;

  return <UserClient users={users.data} />;
};

export default Page;
