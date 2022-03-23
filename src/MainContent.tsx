import Episode from "./components/Episode";
import summaryFormatting from "./utils/summaryFormatting";
// import Navbar from "./components/Navbar";
// import episodesData from "./data/episodesData.json";
import simpsonData from "./data/simpsonData.json";
import searchEpisode from "./utils/searchEpisode";
import { useState } from "react";
import formattingSeasonAndEpisode from "./utils/formattingSeasonAndEpisode";

// interface episodeInfoProps {
//   name: string;
//   summary: string;
// }

const tvShowData = simpsonData;

function MainContent(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");

  const [selectSearch, setSelectSearch] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectSearch(event.target.value);
    console.log(selectSearch);
  }

  const filteredEpisodes = tvShowData.filter((episodeInfo) =>
    searchEpisode(episodeInfo, searchTerm)
  );

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
            image="https://static.tvmaze.com/uploads/images/medium_landscape/398/997172.jpg"
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
            <option value="Select an episode">Select an episode</option>
            {tvShowData.map((episode)=> 
            <option key={episode.id} value={episode.name}>
              {`${episode.name} - ${formattingSeasonAndEpisode(episode.season, episode.number)}`}
              </option>)}
            </select>
        </div>
      </nav>
      <section className="episodes-list">{episodes}</section>
    </>
  );
}

export default MainContent;
