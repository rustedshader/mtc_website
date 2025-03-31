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
import { Search, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function VerifyPayment() {
  const payment_not_verfied_users = await fetch(
    "http://localhost:3000/api/user/get-payment-not-verified-users"
  );
  const payment_pending_users_json = await payment_not_verfied_users.json();

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
              {payment_pending_users_json.length} Pending
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
            <Button variant="outline">Export CSV</Button>
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
                {payment_pending_users_json.map((payment: any) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">
                      {payment.student_name}
                    </TableCell>
                    <TableCell>{payment.mtc_id}</TableCell>
                    <TableCell>{payment.university_email}</TableCell>
                    <TableCell>{payment.payment_refrence_number}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="text-orange-800 border-orange-300 bg-orange-100 hover:bg-orange-200"
                      >
                        Pending Verification
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" asChild>
                        <Link
                          href={`/admin/dashboard/verify-payment/${payment.mtc_id}`}
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

          {payment_pending_users_json.length === 0 && (
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
