interface TVShows {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number | null;
  averageRuntime: number | null;
  premiered: string | null;
  ended: string | null;
  officialSite: string | null;
  schedule: { time: string; days: string[] };
  rating: { average: null | number };
  weight: number;
  network: { id: number; name: string } | null;

  webChannel: null | {
    id: number;
    name: string;
    country: {
      name: string;
      code: string;
      timezone: string;
    } | null;
  };
  dvdCountry: string | null;
  externals: { tvrage: number | null; thetvdb: number | null; imdb: string | null};
  image: {
    medium: string;
    original: string;
  };
  summary: string;
  updated: number;
  _links: {
    self: { href: string };
    previousepisode?: { href: string };
  };
}

export default function searchShow(
    data: TVShows,
    searchFor: string ): string | TVShows {
    if (data.summary) {
      if (
        data.name.toLowerCase().includes(searchFor.toLowerCase()) ||
        data.summary.toLowerCase().includes(searchFor.toLowerCase()) ||
        data.genres.join(" ").toLowerCase().includes(searchFor.toLowerCase())
      ) {
        return data;
      }
      return "";
    } else {
      if (data.name.toLowerCase().includes(searchFor.toLowerCase()) ||
      data.genres.join(" ").toLowerCase().includes(searchFor.toLowerCase())) {
        return data;
      }
      return "";
    }
  }
  