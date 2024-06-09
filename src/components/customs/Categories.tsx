import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSavedAnime } from "@/lib/actions/user.actions";
import Linkcard from "../../app/components/Linkcard";

export async function Categories({ userId }: { userId: string }) {
  const savedAnime = await getSavedAnime(userId);

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
        <TabsContent value="Manga">Manga</TabsContent>
      </Tabs>
    </div>
  );
}
