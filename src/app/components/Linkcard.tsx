"use client";

import { AddAnime } from "@/components/AddAnime";
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
    <div className="container w-full grid grid-cols-3 gap-1 py-10">
      {animeData.map((data: any) => (
        <Card
          key={data._id}
          className="mx-auto overflow-hidden rounded-lg bg-background shadow-md border border-white-100 w-full"
        >
          <CardHeader className="bg-background p-4">
            <CardTitle className="text-lg font-semibold border-b border-white-100">
              {data.Name}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-4">
            <div className="mb-2 text-gray-700">
              <span className="font-semibold">Link: </span>
              <Link
                href={data.Link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Watch Here
              </Link>
            </div>
            <div className="mb-2 text-gray-700">
              <span className="font-semibold">Type: </span>
              <span>{data.Type}</span>
            </div>
            <div className="mb-2 text-gray-700">
              <span className="font-semibold">Status: </span>
              <span>{data.Status}</span>
            </div>
            <Image
              className="h-48 w-full object-contain rounded-t-md"
              src={data.Image}
              alt="Image"
              width={500}
              height={500}
            />
          </CardContent>

          <CardFooter className="flex justify-between items-center  bg-background p-4 border-t border-white-100">
            <Button
              onClick={() => handleDelete(data._id)}
              className="rounded bg-red-500 px-4 py-2 hover:bg-red-600"
            >
              Delete
            </Button>
            <AddAnime
              type="update"
              animeId={JSON.parse(JSON.stringify(data))}
            />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Linkcard;
