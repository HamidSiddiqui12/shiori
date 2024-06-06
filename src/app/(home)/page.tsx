import { AddAnime } from "@/components/AddAnime";
import { getUserById } from "@/lib/actions/user.actions";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Categories } from "../../components/customs/Categories";

const Home = async () => {
  const id = cookies().get("token")?.value || null;

  const user = await getUserById(id || "");

  if (!user) {
    redirect("/login");
  }

  console.log(user);

  return (
    <>
      <section className="container flex items-center justify-between">
        <div className="text-left">
          <h1 className="mb-4 text-4xl font-bold">
            Save, <span className="text-primary">Manage</span>, Visualize
          </h1>
          <p className="text-xl">
            Your Favorite Links in
            <span className="font-semibold">
              One Place<span className="text-primary">!</span>
            </span>
          </p>
          <AddAnime userId={user?._id.toString()} />
        </div>
        <div className="">
          <Image
            src={"/images/img1.jpg"}
            alt="Hero-Img"
            width={500}
            height={500}
          ></Image>
        </div>
      </section>
      <Categories userId={user?._id.toString()} />
    </>
  );
};

export default Home;
