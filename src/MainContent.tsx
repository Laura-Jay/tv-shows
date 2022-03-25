import Episode from "./components/Episode";
import TvShow from "./components/TvShow";
import summaryFormatting from "./utils/summaryFormatting";
// import Navbar from "./components/Navbar";
// import episodesData from "./data/episodesData.json";
// import simpsonData from "./data/simpsonData.json";
import searchEpisode from "./utils/searchEpisode";
import searchShow from "./utils/searchShow";
import { useState } from "react";
import { useEffect } from "react";
import formattingSeasonAndEpisode from "./utils/formattingSeasonAndEpisode";
import tvShowData from "./data/tvShowData.json";

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
  //Contains all episodes fetched from the show whose id is currently contained within the show useState
  const [allEpisodes, setAllEpisodes] = useState<EpisodeData[]>([]);

  //stored a stringified version of the currently displayed shows id
  const [show, setShow] = useState("82");

  //fetches the episodes data for the currently displayed show based on the id number
  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${show}/episodes`)
      .then((res) => res.json())
      .then((data: EpisodeData[]) => setAllEpisodes(data));
  }, [show, allEpisodes]);

  //toggles the view between episode-list and show-list
  const [view, setView] = useState("show-list");

  //contains the search term by which the shows displayed will be filtered
  const [showSearchTerm, setShowSearchTerm] = useState("");

  //contains the search term by which the episodes displayed will be filtered
  const [searchTerm, setSearchTerm] = useState("");

  //if this has a value then selectFilteredEpisodes and only the episode matching the option selected from the selector will be displayed
  const [selectSearch, setSelectSearch] = useState("");

  const [selectShowSearch, setSelectShowSearch] = useState("");

  //when the "return to show list" button is clicked this sets the view back to show-list to display shows and hide episodes
  function handleButtonClick() {
    setSelectSearch("");
    setView("show-list");
  }

  //when a show is clicked this hides show list, displays episode list and passes the id of the clicked episode to the show useState
  function handleClick(id: number) {
    setView("episode-list");
    setShow(id.toString());
  }

  //updates the searchTerm useState to the input string value
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  //updates the showSearchTerm useState to the input string value
  function handleShowChange(event: React.ChangeEvent<HTMLInputElement>) {
    setShowSearchTerm(event.target.value);
  }

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectSearch(event.target.value);
    console.log(selectSearch);
  }

  function handleShowSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setShow(event.target.value);
    setView("episode-list");
    console.log(show);
  }

  const tvShowArray = tvShowData;

  const filteredShows = tvShowArray.filter((showInfo) =>
    searchShow(showInfo, showSearchTerm)
  );

  const filteredEpisodes = allEpisodes.filter((episodeInfo) =>
    searchEpisode(episodeInfo, searchTerm)
  );

  const selectFilteredShows = tvShowArray.filter((showInfo) =>
    searchShow(showInfo, selectShowSearch)
  );

  const selectFilteredEpisodes = allEpisodes.filter((episodeInfo) =>
    searchEpisode(episodeInfo, selectSearch)
  );

  const tvShowList = filteredShows.map((data) => {
    return (
      <>
        <TvShow
          key={data.id}
          name={data.name}
          image={data.image.medium}
          genres={data.genres}
          summary={summaryFormatting(data.summary)}
          status={data.status}
          rating={data.rating.average}
          runtime={data.runtime}
          handleClick={() => handleClick(data.id)}
        />
      </>
    );
  });

  const selectedTvShows = selectFilteredShows.map((data) => {
    return (
      <>
        <TvShow
          key={data.id}
          name={data.name}
          image={data.image.medium}
          genres={data.genres}
          summary={summaryFormatting(data.summary)}
          status={data.status}
          rating={data.rating.average}
          runtime={data.runtime}
          handleClick={() => handleClick(data.id)}
        />
      </>
    );
  });

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
        {view === "show-list" && (
          <div className="searchbar">
            <p>Search:</p>
            <input
              type="text"
              placeholder="Search a show"
              onChange={handleShowChange}
              value={showSearchTerm}
            />
          </div>
        )}
        {view === "episode-list" && (
          <button className="home-button" onClick={handleButtonClick}>
            Return to Shows List
          </button>
        )}
        {view === "episode-list" && (
          <div className="searchbar">
            <p>Search:</p>
            <input
              type="text"
              placeholder="Search an episode"
              onChange={handleChange}
              value={searchTerm}
            />
          </div>
        )}
        {view === "episode-list" && (
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
        )}
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
      {view === "show-list" && (
        <div className="shows-list-view">
          {selectShowSearch ? (
            <div>{selectedTvShows}</div>
          ) : (
            <div>{tvShowList}</div>
          )}
        </div>
      )}
      {view === "episode-list" && (
        <div className="episodes View">
          {selectSearch ? (
            <section className="episodes-list">{selectedEpisodes}</section>
          ) : (
            <section className="episodes-list">{episodes}</section>
          )}
        </div>
      )}
    </>
  );
}

export default MainContent;
