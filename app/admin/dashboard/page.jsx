import { getAllBlogs } from "@/services/BlogService";
import { getAllCategories } from "@/services/CategorieService";
import { getAllComments } from "@/services/CommentService";
import { getAllUsers } from "@/services/UserService";
import Skeleton from "@/components/admin/SkeletonLoading";
import DashboardClient from "./_partials/DashboardClient";

// Force dynamic rendering - disable static generation for this page
export const dynamic = "force-dynamic";

const AdminDashboard = async () => {
  // Fetch all required data in parallel for the dashboard
  const [
    { data: blogs },
    { data: categories },
    { data: comments },
    { data: users },
  ] = await Promise.all([
    getAllBlogs(),
    getAllCategories(),
    getAllComments(),
    getAllUsers(),
  ]);

  // Show skeleton loading if blogs data is not available
  if (!blogs) return <Skeleton type="cards" />;

  return (
    <DashboardClient
      blogs={blogs}
      categories={categories}
      comments={comments}
      users={users}
    />
  );
};

export default AdminDashboard;
