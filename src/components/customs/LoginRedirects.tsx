"use client";
import { logoutUser } from "@/lib/actions/user.actions";
import Link from "next/link";
import { UserInterface } from "../../../types";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";

export const LoginRedirects = ({ user }: { user: UserInterface }) => {
  return (
    <>
      {!user ? (
        <div className="flex items-center justify-center">
          <Link href="/login">
            <Button>Login</Button>
          </Link>
          <Link href="/sign-up">
            <Button>Sign Up</Button>
          </Link>
        </div>
      ) : (
        <div className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-4 text-l sm:text-xl font-bold">
            <p>
              Welcome
              <span className="mx-2 text-primary underline decoration-primary">
                {user.username.toUpperCase()}
              </span>
            </p>
            <Button onClick={async () => logoutUser()}>Logout</Button>
            <ModeToggle />
          </div>
        </div>
      )}
    </>
  );
};
