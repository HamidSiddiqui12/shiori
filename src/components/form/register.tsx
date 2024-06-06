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
  const [isSignUp, setisSignUp] = useState(false);

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const toggleForm = () => {
    setisSignUp((prev) => !prev);
  };

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    setError(null);
    if (type === "register") {
      try {
        await createUser(values);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1 text-center">
              <Link className="inline-flex items-center space-x-2" href="#">
                <span className="text-4xl font-bold">
                  Shi<span className="text-primary">ori</span>
                </span>
              </Link>
              <CardTitle className="text-2xl font-bold">
                {isSignUp ? "Sign Up" : "Sign In"}
              </CardTitle>
              <CardDescription>
                {" "}
                {isSignUp
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

              <CardFooter className="text-center">
                <button
                  onClick={toggleForm}
                  className="text-indigo-500 hover:underline focus:outline-none"
                >
                  {isSignUp
                    ? "Already have an account? Sign In"
                    : "Don’t have an account? Sign Up"}
                </button>
              </CardFooter>
            </CardContent>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4 px-2" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <CardFooter>
              <Button type="submit" className="w-full">
                {isSignUp ? "Sign Up" : "Sign In"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </Form>
  );
}

export default Register;
