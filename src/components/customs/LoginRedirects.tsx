import Link from "next/link";
import { UserInterface } from "../../../types";
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
        <div className="flex items-center justify-center">
          <p className="text-xl font-bold ">
            Welcome
            <span className="ml-2 text-primary">
              {user.username.toUpperCase()}
            </span>
          </p>
        </div>
      )}
    </>
  );
};