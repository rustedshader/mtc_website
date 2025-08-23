"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Loader2,
  Image,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { use } from "react";

interface PaymentDetails {
  id: number;
  user_id: string;
  payment_refrence_number: string | null;
  payment_screenshot_url: string | null;
  payment_verified: boolean;
  user: {
    id: string;
    name: string | null;
    university_email: string | null;
    university_sap_id: string | null;
    university_course: string | null;
    university_course_year: string | null;
    role: string;
  };
}

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function VerifyUserPayment({ params }: Props) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [payment, setPayment] = useState<PaymentDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await fetch(`/api/payments/${resolvedParams.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch payment details");
        }
        const data = await response.json();
        setPayment(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch payment details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [resolvedParams.id]);

  const handleVerifyPayment = async () => {
    try {
      setVerifying(true);
      setMessage(null);

      const response = await fetch(
        `/api/payments/verify/${resolvedParams.id}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to verify payment");
      }

      setMessage({
        type: "success",
        text: "Payment verified successfully!",
      });

      // Refresh payment details
      const updatedResponse = await fetch(`/api/payments/${resolvedParams.id}`);
      if (updatedResponse.ok) {
        const updatedData = await updatedResponse.json();
        setPayment(updatedData);
      }
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error instanceof Error ? error.message : "Failed to verify payment",
      });
    } finally {
      setVerifying(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-72 mt-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-48" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-64 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
            <CardDescription>Failed to load payment details</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => router.push("/admin/dashboard/payment-pending")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Payment List
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-red-600">Not Found</CardTitle>
            <CardDescription>Payment details not found</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Payment not found</AlertDescription>
            </Alert>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => router.push("/admin/dashboard/payment-pending")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Payment List
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">Payment Verification</CardTitle>
              <CardDescription className="mt-2">
                Review and verify payment details for{" "}
                <span className="font-semibold">
                  {payment.user.name || "N/A"}
                </span>
              </CardDescription>
            </div>
            <Badge
              variant={payment.payment_verified ? "default" : "outline"}
              className="text-lg px-4 py-1"
            >
              {payment.payment_verified ? (
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" />
                  Verified
                </span>
              ) : (
                "Pending"
              )}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Student Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">
                    {payment.user.name || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium">
                    {payment.user.university_email || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">SAP ID:</span>
                  <span className="font-medium">
                    {payment.user.university_sap_id || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Course:</span>
                  <span className="font-medium">
                    {payment.user.university_course || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Year:</span>
                  <span className="font-medium">
                    {payment.user.university_course_year || "N/A"}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Payment Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Reference Number:
                  </span>
                  <span className="font-medium">
                    {payment.payment_refrence_number}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge
                    variant={payment.payment_verified ? "default" : "outline"}
                    className="ml-2"
                  >
                    {payment.payment_verified ? "Verified" : "Pending"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Payment Screenshot</h3>
            <div className="relative aspect-video w-full max-w-2xl mx-auto bg-muted rounded-lg overflow-hidden">
              {payment.payment_screenshot_url ? (
                <img
                  src={payment.payment_screenshot_url}
                  alt="Payment Screenshot"
                  className="object-contain w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No payment screenshot uploaded
                </div>
              )}
            </div>
          </div>

          {message && (
            <Alert
              variant={message.type === "error" ? "destructive" : "default"}
              className="mt-4"
            >
              {message.type === "error" ? (
                <AlertCircle className="h-4 w-4" />
              ) : (
                <CheckCircle className="h-4 w-4" />
              )}
              <AlertTitle>
                {message.type === "error" ? "Error" : "Success"}
              </AlertTitle>
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end gap-4 mt-6">
            <Button
              variant="outline"
              onClick={() => router.push("/admin/dashboard/payment-pending")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to List
            </Button>
            {!payment.payment_verified && (
              <Button onClick={handleVerifyPayment} disabled={verifying}>
                {verifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Verify Payment
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
