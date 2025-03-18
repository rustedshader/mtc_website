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
import { CheckCircle2, XCircle, Search, Users } from "lucide-react";
import { getPaymentPendingUsers } from "@/lib/frontendApiFunctions";

export default async function PaymentPendingUsers() {
  const registered_users_data = await getPaymentPendingUsers();

  return (
    <div className="container mx-auto py-8">
      <Card className="shadow-md">
        <CardHeader className="bg-slate-50 dark:bg-slate-800">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Users className="h-6 w-6 mr-2 text-primary" />
              <CardTitle className="text-2xl">Payment Pending Users</CardTitle>
            </div>
            <Badge variant="outline">
              {registered_users_data.length} Users
            </Badge>
          </div>
          <CardDescription>
            Complete list of registered users and Payment not done with their
            details and verification status
          </CardDescription>

          <div className="flex mt-4 gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search users..." className="pl-8" />
            </div>
            <Button variant="outline">Export CSV</Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>MTC ID</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>SAP ID</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registered_users_data.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      {user.student_name}
                    </TableCell>
                    <TableCell>{user.mtc_id}</TableCell>
                    <TableCell>{user.university_email}</TableCell>
                    <TableCell>{user.university_sap_id}</TableCell>
                    <TableCell>{user.university_course}</TableCell>
                    <TableCell>{user.university_course_year}</TableCell>
                    <TableCell>
                      {user.is_verified ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200 flex items-center gap-1 w-fit">
                          <CheckCircle2 className="h-3 w-3" /> Verified
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-orange-800 border-orange-300 bg-orange-100 hover:bg-orange-200 flex items-center gap-1 w-fit"
                        >
                          <XCircle className="h-3 w-3" /> Pending
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={user.is_admin ? "default" : "secondary"}
                        className="w-fit"
                      >
                        {user.is_admin ? "Admin" : "Student"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {registered_users_data.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No users found.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
