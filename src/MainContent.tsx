import Episode from "./components/Episode";
import summaryFormatting from "./utils/summaryFormatting";
// import Navbar from "./components/Navbar";
// import episodesData from "./data/episodesData.json";
// import simpsonData from "./data/simpsonData.json";
import searchEpisode from "./utils/searchEpisode";
import { useState } from "react";
import { useEffect } from "react";
import formattingSeasonAndEpisode from "./utils/formattingSeasonAndEpisode";

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

  useEffect(() => {
    fetch("https://api.tvmaze.com/shows/179/episodes")
      .then((res) => res.json())
      .then((data: EpisodeData[]) => setAllEpisodes(data));
  }, []);

  console.log(allEpisodes);

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
