import Skeleton from "@/components/admin/SkeletonLoading";
import { getAllUsers } from "@/services/UserService";
import React from "react";
import UserClient from "./_partials/UserClient";

// Force dynamic rendering - disable static generation for this page
export const dynamic = "force-dynamic";

const Page = async () => {
  // Fetch all users data
  const { data: users } = await getAllUsers();

  // Show skeleton loading if users data is not available
  if (!users) return <Skeleton />;

  return <UserClient users={users} />;
};

export default Page;
