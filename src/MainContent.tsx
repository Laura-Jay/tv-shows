import Episode from "./components/Episode";
// import Navbar from "./components/Navbar";
import episodesData from "./data/episodesData.json";
import searchEpisode from "./utils/searchEpisode";
import { useState } from "react";

// interface episodeInfoProps {
//   name: string;
//   summary: string;
// }

function MainContent(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  const filteredEpisodes = episodesData.filter((episodeInfo) =>
    searchEpisode(episodeInfo, searchTerm)
  );

  const episodes = filteredEpisodes.map((data) => {
    return (
      <>
        <Episode
          key={data.id}
          name={data.name}
          season={data.season}
          number={data.number}
          image={data.image.medium}
          summary={data.summary.replace(/<\/?p[^>]*>/g, "")}
        />
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
