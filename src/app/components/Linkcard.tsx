"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const Linkcard = ({ data }: { data: string }) => {
  const animeData = JSON.parse(data);
  return (
    <div className="container mx-auto py-10">
      {animeData.map((data: any) => (
        <Card
          key={data._id}
          className="mx-auto max-w-sm overflow-hidden rounded-lg bg-white shadow-md"
        >
          <CardHeader>
            <CardTitle>{data.animeName}</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="mb-2 text-gray-700">
              <span className="font-semibold">Link: </span>
              {/* <span>Watch Here</span> */}
              <Link
                href={data.animeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                Watch Here
              </Link>
            </div>
            <div className="mb-2 text-gray-700">
              <span className="font-semibold">Status: </span>
              <span>{data.animeStatus}</span>
            </div>
            <Image
              className="h-48 w-full object-cover"
              src={data.animeImage}
              alt="Anime Image"
              width={500}
              height={500}
            />
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
              Delete
            </Button>
            <Button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
              Edit
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Linkcard;
