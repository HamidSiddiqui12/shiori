"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addAnime, updateAnime } from "@/lib/actions/user.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const animeFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(30, { message: "Name is too long" }),
  link: z
    .string()
    .min(1, { message: "Link is required" })
    .max(100, { message: "Link is too long" }),
  type: z.string().min(1, { message: "Type is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  cover: z
    .string()
    .min(1, { message: "Image is required" })
    .max(100, { message: "Image is too long" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(15, { message: "Description is too long" }),
});

export function AddAnime({
  userId,
  type = "create",
  animeId,
}: {
  userId?: string | undefined;
  type?: string;
  animeId?: any | undefined;
}) {
  const form = useForm<z.infer<typeof animeFormSchema>>({
    resolver: zodResolver(animeFormSchema),
    defaultValues: {
      name: animeId ? animeId.name : "",
      link: animeId ? animeId.link : "",
      type: animeId ? animeId.type : "",
      status: animeId ? animeId.status : "",
      cover: animeId ? animeId.cover : "",
      description: animeId ? animeId.description : "",
    },
  });

  async function onSubmit(values: z.infer<typeof animeFormSchema>) {
    try {
      if (type === "create" && userId) {
        await addAnime({
          userId,
          name: values.name,
          link: values.link,
          type: values.type,
          status: values.status,
          cover: values.cover,
          description: values.description,
        });
      }
      if (type === "update" && animeId) {
        await updateAnime({
          name: values.name,
          link: values.link,
          type: values.type,
          status: values.status,
          cover: values.cover,
          description: values.description,
          id: animeId._id,
        });
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{type === "create" ? "Add Link" : "Update"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>
                {type === "create" ? "Add Details" : "Update Details"}
              </DialogTitle>
              <DialogDescription>
                Add Details and Link to your favourite anime{" "}
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="xyz" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link</FormLabel>
                    <FormControl>
                      <Input placeholder="http://xyz.com" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="anime">Anime</SelectItem>
                        <SelectItem value="manga">Manga</SelectItem>
                        {/* <SelectItem value="Others">Others</SelectItem> */}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the anime status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ongoing">
                          Watching/Reading
                        </SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="planning">
                          Plan to watch/read
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="cover"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Image</FormLabel>
                    <FormControl>
                      <Input placeholder="https://image.com" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>description</FormLabel>
                    <FormControl>
                      <Input placeholder="xyz" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              {form.formState.isValid ? (
                <DialogClose>
                  <Button type="submit">Save changes</Button>
                </DialogClose>
              ) : (
                <Button type="submit">Save changes</Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
