import { AddAnime } from "@/components/AddAnime";
import { Categories } from "@/components/customs/Categories";
import { getUserById } from "@/lib/actions/user.actions";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

const Home = async () => {
  const id = cookies().get("token")?.value || null;

  if (!id) {
    redirect("/login");
  }

  const user = await getUserById(id as string);

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <section className="container flex items-center justify-between">
        <div className="text-left">
          <h1 className="mb-4 sm:text-4xl font-bold">
            Save, <span className="text-primary">Manage</span>, Visualize
          </h1>
          <p className="pb-8 sm:text-xl">
            Your Favorite Links in{" "}
            <span className="font-semibold">
              One Place<span className="text-primary">!</span>
            </span>
          </p>
          <AddAnime userId={JSON.parse(JSON.stringify(user._id))} />
        </div>
        <div>
          <Image
            src={"/images/img1.png"}
            alt="Hero-Img"
            width={500}
            height={500}
          ></Image>
        </div>
      </section>
      <Categories userId={JSON.parse(JSON.stringify(user._id))} />
    </>
  );
};

export default Home;
