import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Users, ArrowRight, Image } from "lucide-react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { stackServerApp } from "@/stack";

const prisma = new PrismaClient();

export default async function VerifyPayment() {
  // Ensure admin access
  const user = await stackServerApp.getUser({ or: "redirect" });
  const userData = await prisma.registeredUsers.findUnique({
    where: { id: user.id },
  });

  if (!userData || userData.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  // Get payments that need verification
  const payment_pending_users = await prisma.registeredUsers.findMany({
    include: {
      payments: {
        where: {
          payment_verified: false,
        },
      },
    },
    where: {
      payments: {
        some: {
          payment_verified: false,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return (
    <div className="container mx-auto py-8">
      <Card className="shadow-md">
        <CardHeader className="bg-slate-50 dark:bg-slate-800">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Users className="h-6 w-6 mr-2 text-primary" />
              <CardTitle className="text-2xl">Verify Payments</CardTitle>
            </div>
            <Badge variant="outline">
              {payment_pending_users.length} Pending
            </Badge>
          </div>
          <CardDescription>
            Review and verify payment submissions from registered users
          </CardDescription>

          <div className="flex mt-4 gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search payments..." className="pl-8" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>MTC ID</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Reference Number</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payment_pending_users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      {user.name || "N/A"}
                    </TableCell>
                    <TableCell>{user.mtc_id || "N/A"}</TableCell>
                    <TableCell>{user.university_email}</TableCell>
                    <TableCell>
                      {user.payments[0]?.payment_refrence_number || "N/A"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="text-orange-800 border-orange-300 bg-orange-100 hover:bg-orange-200"
                      >
                        Pending Verification
                      </Badge>
                    </TableCell>
                    <TableCell className="space-x-2">
                      {user.payments[0]?.payment_screenshot_url && (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={user.payments[0].payment_screenshot_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image className="h-4 w-4 mr-2" />
                            View Screenshot
                          </a>
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" asChild>
                        <Link
                          href={`/admin/dashboard/verify-payment/${user.payments[0]?.id}`}
                        >
                          <ArrowRight className="h-4 w-4 mr-2" />
                          Review
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {payment_pending_users.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No pending payments to verify.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
