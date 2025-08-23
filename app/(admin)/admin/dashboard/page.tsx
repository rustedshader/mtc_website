import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { stackServerApp } from "@/stack";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { Users, CreditCard, FileText, MessageSquare } from "lucide-react";

const prisma = new PrismaClient();

const getAdminData = async () => {
  const user = await stackServerApp.getUser({ or: "redirect" });
  if (!user) {
    redirect("/");
  }

  // Check if user is admin
  const userData = await prisma.registeredUsers.findUnique({
    where: { id: user.id },
  });

  if (!userData || userData.role !== "ADMIN") {
    redirect("/user/dashboard");
  }

  // Get dashboard statistics
  const [totalUsers, pendingPayments, totalPosts, totalContacts] =
    await Promise.all([
      prisma.registeredUsers.count(),
      prisma.payments.count({
        where: { payment_verified: false },
      }),
      prisma.post.count(),
      prisma.contact.count({
        where: { resolved: false },
      }),
    ]);

  return {
    user: userData,
    stats: {
      totalUsers,
      pendingPayments,
      totalPosts,
      totalContacts,
    },
  };
};

export default async function AdminDashboard() {
  const { user, stats } = await getAdminData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user.name || user.university_email}
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Registered users in the system
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Payments
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingPayments}</div>
            <p className="text-xs text-muted-foreground">
              Payments awaiting verification
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPosts}</div>
            <p className="text-xs text-muted-foreground">
              Published and draft posts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unresolved Contacts
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalContacts}</div>
            <p className="text-xs text-muted-foreground">
              Contact messages to review
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Use the sidebar to manage users, verify payments, create posts,
                and handle contact messages.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <a
                href="/admin/dashboard/payment-pending-users"
                className="block text-sm text-blue-600 hover:text-blue-800"
              >
                → Review pending payments ({stats.pendingPayments})
              </a>
              <a
                href="/admin/dashboard/contacts"
                className="block text-sm text-blue-600 hover:text-blue-800"
              >
                → Check unresolved contacts ({stats.totalContacts})
              </a>
              <a
                href="/admin/dashboard/create-post"
                className="block text-sm text-blue-600 hover:text-blue-800"
              >
                → Create new post
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
