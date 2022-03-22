import Episode from "./components/Episode";
// import Navbar from "./components/Navbar";
import episodesData from "./data/episodesData.json";
import { useState } from "react";

interface episodeInfoProps {
  name: string;
  summary: string;
}

function MainContent(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
    console.log(searchTerm);
  }

  function searchEpisode(episodeInfo: episodeInfoProps) {
    if (
      episodeInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      episodeInfo.summary.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return episodeInfo;
    }
  }

  const filteredEpisodes = episodesData.filter(searchEpisode);

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
