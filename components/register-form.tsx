"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as z from "zod";
import { toast } from "sonner";

const registerSchema = z.object({
  student_name: z.string().min(1, {
    message: "Please enter your full name",
  }),
  sap_id: z.string().min(1, {
    message: "Please enter a valid SAP Id",
  }),
  course: z.string().min(1, {
    message: "Please enter a valid course",
  }),
  year: z.string().min(1, {
    message: "Please enter a valid year",
  }),
  payment_screenshot: z.any().refine((file) => file instanceof File, {
    message: "Please upload a payment screenshot",
  }),
  payment_reference_id: z.string().min(1, {
    message: "Please enter a valid payment reference id",
  }),
});

export function RegisterForm({ user_email }: { user_email: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize the form with react-hook-form and Zod resolver
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      student_name: "",
      sap_id: "",
      course: "",
      year: "",
      payment_screenshot: undefined,
      payment_reference_id: "",
    },
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setIsSubmitting(true);

    try {
      // Create a FormData object to handle file uploads
      const formData = new FormData();
      formData.append("student_name", values.student_name);
      formData.append("email", user_email);
      formData.append("student_sap_id", values.sap_id);
      formData.append("student_course", values.course);
      formData.append("student_course_year", values.year);
      formData.append("payment_screenshot", values.payment_screenshot);
      formData.append("payment_refrence_number", values.payment_reference_id);

      // Submit the form data to the backend API
      const response = await fetch("/api/user/register", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Show success message
        toast("Registration successful", {
          description: "Your registration has been submitted successfully.",
          duration: 3000,
        });

        // Reload the page after a short delay to allow the user to see the success message
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        const errorData = await response
          .json()
          .catch(() => ({ error: "Registration failed" }));
        toast("Registration failed", {
          description: errorData.error || "Please try again later",
          duration: 5000,
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast("Error", {
        description: "An unexpected error occurred. Please try again later.",
        duration: 5000,
      });
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <FormField
          control={form.control}
          name="student_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* SAP ID Field */}
        <FormField
          control={form.control}
          name="sap_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SAP ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter your SAP ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Course Field */}
        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course</FormLabel>
              <FormControl>
                <Input placeholder="Enter your course" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Year Field */}
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year</FormLabel>
              <FormControl>
                <Input placeholder="Enter your year" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Payment Screenshot Field (File Input) */}
        <FormField
          control={form.control}
          name="payment_screenshot"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Payment Screenshot</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onChange(e.target.files?.[0])}
                  {...fieldProps}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Payment Reference ID Field */}
        <FormField
          control={form.control}
          name="payment_reference_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Reference ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter payment reference ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Registering...
            </>
          ) : (
            "Register"
          )}
        </Button>
      </form>
    </Form>
  );
}
