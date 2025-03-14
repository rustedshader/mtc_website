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
import * as z from "zod";

// Define the form schema
const registerSchema = z.object({
  sap_id: z.string().min(1, {
    message: "Please enter a valid SAP Id",
  }),
  course: z.string().min(1, {
    message: "Please enter a valid course",
  }),
  year: z.string().min(1, {
    message: "Please enter a valid year",
  }),
  payment_screenshot: z.any(), // Use z.any() for file input since Zod doesn't support File type directly
  payment_reference_id: z.string().min(1, {
    message: "Please enter a valid payment reference id",
  }),
});

export function RegisterForm() {
  // Initialize the form with react-hook-form and Zod resolver
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      sap_id: "",
      course: "",
      year: "",
      payment_screenshot: null, // Default value for file input is null
      payment_reference_id: "",
    },
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof registerSchema>) {
    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append("student_name", "shubhang");
    formData.append("student_sap_id", values.sap_id);
    formData.append("student_course", values.course);
    formData.append("student_course_year", values.year);
    formData.append("payment_screenshot", values.payment_screenshot); // Append the file
    formData.append("payment_refrence_number", values.payment_reference_id);
    formData.append("email", "rustedshader@gmail.com");

    try {
      // Submit the form data to the backend API
      const response = await fetch("/api/user/register", {
        method: "POST",
        body: formData, // No need to set Content-Type; fetch handles it for FormData
      });

      if (response.ok) {
        console.log("Registration successful");
      } else {
        console.error("Registration failed:", await response.text());
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Screenshot</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*" // Restrict to image files
                  onChange={(e) => field.onChange(e.target.files?.[0])} // Pass the first file to the field
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
        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
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
