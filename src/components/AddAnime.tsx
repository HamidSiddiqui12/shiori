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
import { addAnime } from "@/lib/actions/user.actions";
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
  animeName: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name is too long" }),
  animeLink: z
    .string()
    .min(1, { message: "Link is required" })
    .max(100, { message: "Link is too long" }),
  animeStatus: z
    .string()
    .min(1, { message: "Status is required" })
    .max(100, { message: "Status is too long" }),
  animeImage: z
    .string()
    .min(1, { message: "Image is required" })
    .max(100, { message: "Image is too long" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(100, { message: "Description is too long" }),
});

export function AddAnime({ userId }: { userId: string }) {
  const form = useForm<z.infer<typeof animeFormSchema>>({
    resolver: zodResolver(animeFormSchema),
    defaultValues: {
      animeName: "",
      animeLink: "",
      animeStatus: "",
      animeImage: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof animeFormSchema>) {
    try {
      await addAnime({
        userId,
        animeName: values.animeName,
        animeLink: values.animeLink,
        animeStatus: values.animeStatus,
        animeImage: values.animeImage,
        description: values.description,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-8">Add Link</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Add Link</DialogTitle>
              <DialogDescription>
                Add Details and Link to your favourite anime{" "}
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="animeName"
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
              name="animeLink"
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

            <FormField
              control={form.control}
              name="animeStatus"
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
                      <SelectItem value="watching">Watching</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="planning">Plan to watch</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="animeImage"
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

            <DialogFooter>
              {form.formState.isValid ? (
                <DialogClose>
                  <Button type="submit">Save changes</Button>
                </DialogClose>
              ) : (
                <Button disabled type="submit">
                  Save changes
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
