import { getUserById } from "@/lib/actions/user.actions";
import { UserInterface } from "../../../types";
import { LoginRedirects } from "./LoginRedirects";

export const Header = async ({ id }: { id: string | null }) => {
  if (!id) return null;

  const user: UserInterface = await getUserById(id as string);

  return (
    <header className="px-4 py-2 sm:px-6 sm:py-3 md:px-10 md:py-4">
      <nav className="flex flex-col items-center justify-around sm:flex-row">
        <div className="mb-2 sm:mb-0">
          <h1 className="text-center text-xl font-extrabold sm:text-2xl">
            Shio<span className="text-primary">Ri</span>
          </h1>
        </div>
        <div>
          <LoginRedirects user={user} />
        </div>
      </nav>
    </header>
  );
};
