import Episode from "./components/Episode";
import summaryFormatting from "./utils/summaryFormatting";
// import Navbar from "./components/Navbar";
// import episodesData from "./data/episodesData.json";
// import simpsonData from "./data/simpsonData.json";
import searchEpisode from "./utils/searchEpisode";
import { useState } from "react";
import { useEffect } from "react";
import formattingSeasonAndEpisode from "./utils/formattingSeasonAndEpisode";
import tvShowData from "./data/tvShowData.json";

// interface TVShows {
//   id: number;
//   url: string;
//   name: string;
//   type: string;
//   language: string;
//   genres: string[];
//   status: string;
//   runtime: number;
//   averageRuntime: number;
//   premiered: string;
//   ended: string;
//   officialSite: string | null;
//   schedule: { time: string; days: string[] };
//   rating: { average: null | number };
//   weight: number;
//   network: { id: number; name: string };

//   webChannel: null | {
//     id: number;
//     name: string;
//     country: {
//       name: string;
//       code: string;
//       timezone: string;
//     };
//   };
//   dvdCountry: string | null;
//   externals: { tvrage: number; thetvdb: number; imdb: string };
//   image: {
//     medium: string;
//     original: string;
//   };
//   summary: string;
//   updated: number;
//   _links: {
//     self: { href: string };
//     previousepisode: { href: string };
//   };
// }

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

function MainContent(): JSX.Element {
  const [allEpisodes, setAllEpisodes] = useState<EpisodeData[]>([]);
  const [show, setShow] = useState("82");

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${show}/episodes`)
      .then((res) => res.json())
      .then((data: EpisodeData[]) => setAllEpisodes(data));
  }, [show]);

  // const tvShowData = allEpisodes;

  const [searchTerm, setSearchTerm] = useState("");

  const [selectSearch, setSelectSearch] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectSearch(event.target.value);
    console.log(selectSearch);
  }

  function handleShowSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setShow(event.target.value);
    console.log(show);
  }

  const filteredEpisodes = allEpisodes.filter((episodeInfo) =>
    searchEpisode(episodeInfo, searchTerm)
  );

  const selectFilteredEpisodes = allEpisodes.filter((episodeInfo) =>
    searchEpisode(episodeInfo, selectSearch)
  );

  const selectedEpisodes = selectFilteredEpisodes.map((data) => {
    return (
      <>
        {data.image ? (
          <Episode
            key={data.id}
            name={data.name}
            season={data.season}
            number={data.number}
            image={data.image.medium}
            summary={summaryFormatting(data.summary)}
          />
        ) : (
          <Episode
            key={data.id}
            name={data.name}
            season={data.season}
            number={data.number}
            image="https://cdn.pixabay.com/photo/2017/06/08/17/32/not-found-2384304_960_720.jpg"
            summary={summaryFormatting(data.summary)}
          />
        )}
      </>
    );
  });

  const episodes = filteredEpisodes.map((data) => {
    return (
      <>
        {data.image ? (
          <Episode
            key={data.id}
            name={data.name}
            season={data.season}
            number={data.number}
            image={data.image.medium}
            summary={summaryFormatting(data.summary)}
          />
        ) : (
          <Episode
            key={data.id}
            name={data.name}
            season={data.season}
            number={data.number}
            image="https://cdn.pixabay.com/photo/2017/06/08/17/32/not-found-2384304_960_720.jpg"
            summary={summaryFormatting(data.summary)}
          />
        )}
      </>
    );
  });

  return (
    <>
      <nav className="navbar">
        <h1 className="title">Episode Guide</h1>
        <div className="searchbar">
          <p>Search:</p>
          <input
            type="text"
            placeholder="Search an episode"
            onChange={handleChange}
            value={searchTerm}
          />
        </div>
        <div className="dropdown">
          <select onChange={handleSelect}>
            <option value="">Select an episode</option>
            {allEpisodes.map((episode) => (
              <option key={episode.id} value={episode.name}>
                {`${episode.name} - ${formattingSeasonAndEpisode(
                  episode.season,
                  episode.number
                )}`}
              </option>
            ))}
          </select>
        </div>
        <div className="dropdown">
          <select onChange={handleShowSelect}>
            <option value="">Select a TV show</option>
            {tvShowData.map((tvShow) => (
              <option key={tvShow.id} value={tvShow.id.toString()}>
                {`${tvShow.name}`}
              </option>
            ))}
          </select>
        </div>
      </nav>
      {selectSearch ? (
        <section className="episodes-list">{selectedEpisodes}</section>
      ) : (
        <section className="episodes-list">{episodes}</section>
      )}
    </>
  );
}

export default MainContent;
