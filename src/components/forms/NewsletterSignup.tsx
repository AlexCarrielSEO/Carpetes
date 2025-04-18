import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type FormValues = z.infer<typeof formSchema>;

interface NewsletterSignupProps {
  onSubmit?: (values: FormValues) => void;
  buttonText?: string;
  placeholderText?: string;
  className?: string;
}

const NewsletterSignup = ({
  onSubmit = () => {},
  buttonText = "Subscribe",
  placeholderText = "Enter your email",
  className = "",
}: NewsletterSignupProps) => {
  const [submissionState, setSubmissionState] = useState<
    "idle" | "success" | "error"
  >("idle");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      await onSubmit(values);
      setSubmissionState("success");
      form.reset();
      // Reset to idle after 3 seconds
      setTimeout(() => setSubmissionState("idle"), 3000);
    } catch (error) {
      setSubmissionState("error");
      // Reset to idle after 3 seconds
      setTimeout(() => setSubmissionState("idle"), 3000);
    }
  };

  return (
    <div
      className={`w-full max-w-md bg-white p-4 rounded-lg shadow-sm ${className}`}
    >
      {submissionState === "success" ? (
        <div className="flex items-center space-x-2 text-green-600 p-2 bg-green-50 rounded-md">
          <CheckCircle className="h-5 w-5" />
          <p className="text-sm font-medium">Thank you for subscribing!</p>
        </div>
      ) : submissionState === "error" ? (
        <div className="flex items-center space-x-2 text-red-600 p-2 bg-red-50 rounded-md">
          <AlertCircle className="h-5 w-5" />
          <p className="text-sm font-medium">
            Something went wrong. Please try again.
          </p>
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col sm:flex-row gap-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <FormControl>
                      <Input
                        placeholder={placeholderText}
                        className="pl-9 w-full"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-xs mt-1" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="whitespace-nowrap"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Subscribing..." : buttonText}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default NewsletterSignup;
