import Episode from "./components/Episode";
import summaryFormatting from "./utils/summaryFormatting";
// import Navbar from "./components/Navbar";
// import episodesData from "./data/episodesData.json";
import simpsonData from "./data/simpsonData.json";
import searchEpisode from "./utils/searchEpisode";
import { useState } from "react";
//import FormattSeason from "./utils/FormattingSeasonAndEpisode";

// interface episodeInfoProps {
//   name: string;
//   summary: string;
// }

const tvShowData = simpsonData;

function MainContent(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
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
      </nav>
      <section className="episodes-list">{episodes}</section>
    </>
  );
}

export default MainContent;
