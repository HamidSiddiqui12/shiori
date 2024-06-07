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
import { createUser, loginUser } from "@/lib/actions/user.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const registerFormSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(3, "Password is too short"),
});

function Register({ type }: { type: "login" | "register" }) {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    setError(null);
    if (type === "register") {
      try {
        await createUser(values);
        toast("Account created successfully");
        router.push("/login");
      } catch (error: any) {
        console.log(error);
        setError(error.message);
      }
    }
    if (type === "login") {
      try {
        await loginUser(values);
        router.push("/");
      } catch (error: any) {
        console.log(error);
        setError(error.message);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex min-h-dvh items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1 text-center">
              <p className="inline-flex items-center space-x-2">
                <span className="text-4xl font-bold">
                  Shi<span className="text-primary">ori</span>
                </span>
              </p>
              <CardTitle className="text-2xl font-bold">
                {/* {type ? "Sign Up" : "Sign In"} */}
                {type === "register" ? "Sign Up" : "Sign In"}
              </CardTitle>
              <CardDescription>
                {" "}
                {/* {type
                  ? "Create an account to get started"
                  : "Sign in to your account"} */}
                {type === "register"
                  ? "Create an account to get started"
                  : "Sign in to your account"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>password</FormLabel>
                    <FormControl>
                      <Input placeholder="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <div className="my-4">
                  <Alert variant="destructive">
                    <AlertCircle className="size-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </div>
              )}
              <div className="mt-6 text-sm">
                {type === "register" ? (
                  <Link href="/login">
                    <span className="text-indigo-500 hover:underline focus:outline-none">
                      Already have an account? Sign In
                    </span>
                  </Link>
                ) : (
                  <Link href="/sign-up">
                    <span className="text-indigo-500 hover:underline focus:outline-none">
                      Don’t have an account? Sign Up
                    </span>
                  </Link>
                )}
              </div>
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full">
                {type === "register" ? "Sign Up" : "Sign In"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </Form>
  );
}

export default Register;
