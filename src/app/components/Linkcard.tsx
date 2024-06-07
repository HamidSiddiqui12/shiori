"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deleteAnime } from "@/lib/actions/user.actions";
import Image from "next/image";
import Link from "next/link";

const Linkcard = ({ data }: { data: string }) => {
  const animeData = JSON.parse(data);

  const handleDelete = async (id: string) => {
    await deleteAnime(id);
  };

  return (
    <div className="container mx-auto py-10">
      {animeData.map((data: any) => (
        <Card
          key={data._id}
          className="mx-auto max-w-sm overflow-hidden rounded-lg bg-white shadow-md border border-gray-300"
        >
          <CardHeader className="bg-gray-100 p-4">
            <CardTitle className="text-lg font-semibold">
              {data.animeName}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-4">
            <div className="mb-2 text-gray-700">
              <span className="font-semibold">Link: </span>
              <Link
                href={data.animeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Watch Here
              </Link>
            </div>
            <div className="mb-2 text-gray-700">
              <span className="font-semibold">Status: </span>
              <span>{data.animeStatus}</span>
            </div>
            <Image
              className="h-48 w-full object-cover rounded-t-md"
              src={data.animeImage}
              alt="Anime Image"
              width={500}
              height={500}
            />
          </CardContent>

          <CardFooter className="flex justify-between bg-gray-100 p-4">
            <Button
              onClick={() => handleDelete(data._id)}
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
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
