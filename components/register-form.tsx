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
  payment_screenshot: z.string().min(1, {
    message: "Please enter a valid payment screenshot",
  }),
  payment_reference_id: z.string().min(1, {
    message: "Please enter a valid payment reference id",
  }),
});

export function RegisterForm() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      sap_id: "",
      course: "",
      year: "",
      payment_screenshot: "",
      payment_reference_id: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    const formData = new FormData();
    formData.append("sap_id", values.sap_id);
    formData.append("course", values.course);
    formData.append("year", values.year);
    formData.append("payment_screenshot", values.payment_screenshot);
    formData.append("payment_reference_id", values.payment_reference_id);

    // Here you would typically submit the form data to your backend
    // For example: await fetch('/api/register', { method: 'POST', body: formData });
    console.log(formData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

        <FormField
          control={form.control}
          name="payment_screenshot"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Screenshot</FormLabel>
              <FormControl>
                <Input placeholder="Enter payment screenshot URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
