import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const Linkcard = () => {
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <Image
          className="w-full h-48 object-cover"
          src=""
          alt="Anime Image"
        ></Image>
        <CardHeader>
          <CardTitle>Anime Name</CardTitle>
          <CardDescription>
            <div className="text-gray-700 mb-2">
              <span className="font-semibold">Link: </span>
              <a
                href="/"
                className="text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch Here
              </a>
            </div>
            <div className="text-gray-700 mb-2">
              <span className="font-semibold">Status: </span>Watched
            </div>
          </CardDescription>
        </CardHeader>
        {/* <CardContent>
          <p>Additional content or description can go here.</p>
        </CardContent> */}
        <CardFooter className="flex justify-between">
          <Button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Delete
          </Button>
          <Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Edit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Linkcard;
