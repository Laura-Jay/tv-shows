interface EpisodeData {
  id: number;
  url: string;
  name: string;
  season: number;
  number: number;
  airdate: string;
  airstamp: string;
  runtime: number;
  image: { medium: string; original: string } | null;
  summary: string;
  _links: { self: { href: string } };
}

export default function searchEpisode(
  data: EpisodeData,
  searchFor: string
): string | EpisodeData {
  if (data.summary) {
    if (
      data.name.toLowerCase().includes(searchFor.toLowerCase()) ||
      data.summary.toLowerCase().includes(searchFor.toLowerCase())
    ) {
      return data;
    }
    return "";
  } else {
    if (data.name.toLowerCase().includes(searchFor.toLowerCase())) {
      return data;
    }
    return "";
  }
}
