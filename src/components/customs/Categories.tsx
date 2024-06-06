import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSavedAnime } from "@/lib/actions/user.actions";
import Linkcard from "../../app/components/Linkcard";

export async function Categories({ userId }: { userId: string }) {
  const savedAnime = await getSavedAnime(userId);

  console.log(savedAnime);

  return (
    <section className="flex flex-col items-center justify-between p-6 sm:flex-row">
      <div className="mb-4 flex w-full flex-col items-center sm:mb-0 sm:w-auto sm:flex-row">
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
            <div>
              <Linkcard data={JSON.stringify(savedAnime)} />
            </div>
          </TabsContent>
          <TabsContent value="Manga">Change your password here.</TabsContent>
          <TabsContent value="Others">Other content here.</TabsContent>
        </Tabs>
      </div>
      <div className="flex w-full justify-center sm:w-auto sm:justify-end">
        <Select>
          <SelectTrigger className="w-full sm:w-[180px]">
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
  );
}
