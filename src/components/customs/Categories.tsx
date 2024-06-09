import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSavedAnime, getSavedManga } from "@/lib/actions/user.actions";
import Linkcard from "../../app/components/Linkcard";

export async function Categories({ userId }: { userId: string }) {
  const savedAnime = await getSavedAnime(userId);
  const savedManga = await getSavedManga(userId);

  return (
    <div className="w-full p-6">
      <Tabs defaultValue="Anime" className="w-full">
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
        <TabsContent value="Manga">
          <div>
            <Linkcard data={JSON.stringify(savedManga)} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
