import { getUserById } from "@/lib/actions/user.actions";
import { UserInterface } from "../../../types";
import { LoginRedirects } from "./LoginRedirects";

export const Header = async ({ id }: { id: string | null }) => {
  const user: UserInterface = await getUserById(id || "");

  return (
    <header className="px-10 py-4">
      <nav className="flex items-center justify-around">
        <div>
          <h1 className="text-center text-2xl font-extrabold">
            Shio<span className="text-primary">Ri</span>
          </h1>
        </div>
        <LoginRedirects user={user} />
      </nav>
    </header>
  );
};
