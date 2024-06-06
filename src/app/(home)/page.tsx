import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
      <section className="flex items-center justify-around">
        <div>
          <Tabs defaultValue="Anime" className="w-[400px]">
            <TabsList>
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
            <TabsContent value="Card">
              <Linkcard />
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>
    </>
  );
};

export default Home;
