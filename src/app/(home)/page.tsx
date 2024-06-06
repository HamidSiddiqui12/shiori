import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Linkcard from "../components/Linkcard";

const Home = () => {
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
          <Button className="mt-8">Add Link</Button>
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
      <section className="flex flex-col sm:flex-row items-center justify-between p-6">
        <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0 w-full sm:w-auto">
          <Tabs defaultValue="Anime" className="w-full sm:w-[400px]">
            <TabsList className="flex">
              <TabsTrigger
                value="Anime"
                className="font-semibold focus:font-semibold"
              >
                Anime
              </TabsTrigger>
              <TabsTrigger value="Manga" className="focus:font-semibold">
                Manga
              </TabsTrigger>
              <TabsTrigger value="Others" className="focus:font-semibold">
                Others
              </TabsTrigger>
            </TabsList>
            <TabsContent value="Anime">
              <Linkcard />
            </TabsContent>
            <TabsContent value="Manga">
              <Linkcard />
            </TabsContent>
            <TabsContent value="Others">
              <Linkcard />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default Home;
