import { RoadmapExplorer } from "./roadmap-explorer";

type HomeProps = {
  searchParams: Promise<{ lang?: string }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const initialLanguage = params.lang === "en" ? "en" : "ko";

  return <RoadmapExplorer initialLanguage={initialLanguage} />;
}
