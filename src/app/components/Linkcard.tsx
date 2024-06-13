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
import { deleteSeries } from "@/lib/actions/user.actions";
import Image from "next/image";
import Link from "next/link";

const Linkcard = ({ data }: { data: string }) => {
  const animeData = JSON.parse(data);

  const handleDelete = async (id: string) => {
    await deleteSeries(id);
  };

  return (
    <div className="container mx-auto grid w-full grid-cols-1 gap-4 py-10 sm:grid-cols-2 md:grid-cols-3">
      {animeData.map((data: any) => (
        <Card
          key={data._id}
          className="mx-auto w-full overflow-hidden rounded-lg border bg-background shadow-md"
        >
          <CardHeader className="bg-background p-4">
            <CardTitle className="border-b text-base sm:text-lg font-semibold">
              {data.name}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-4">
            <div className="mb-2 text-gray-700">
              <span className="font-semibold">Link: </span>
              <Link
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Watch Here
              </Link>
            </div>
            <div className="mb-2 text-gray-700">
              <span className="font-semibold">Type: </span>
              <span>{data.type}</span>
            </div>
            <div className="mb-2 text-gray-700">
              <span className="font-semibold">Status: </span>
              <span>{data.status}</span>
            </div>
            <Image
              className="h-48 w-full rounded-t-md object-contain"
              src={data.cover}
              alt="Image"
              width={500}
              height={500}
            />
          </CardContent>

          <CardFooter className="flex items-center justify-between border-t bg-background p-4">
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
