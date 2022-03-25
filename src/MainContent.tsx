import Episode from "./components/Episode";
import summaryFormatting from "./utils/summaryFormatting";
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
  //setting up use state for the episodes of a specfic tv shows
  const [allEpisodes, setAllEpisodes] = useState<EpisodeData[]>([]);
  //setting up use state as a string for the show id
  const [show, setShow] = useState("82");

  //getting the episode data from a selected show and pushing it to all episodes
  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${show}/episodes`)
      .then((res) => res.json())
      .then((data: EpisodeData[]) => setAllEpisodes(data));
  }, [show]);

  //setting up useState for user input to the search bar for episodes
  const [searchTerm, setSearchTerm] = useState("");

  //setting up useState for the selector menu to select an episode
  const [selectSearch, setSelectSearch] = useState("");

  //Updating search term each keystroke the use makes (episodes)
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  //updating on what the user selects from the dropdown select menu and pass the name (episodes)
  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectSearch(event.target.value);
  }

  //updating on what the user selects from the tvshow dropddown select menu and passes the id
  function handleShowSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setShow(event.target.value);
  }

  //updating the app with episode details depending on the search input from the user
  const filteredEpisodes = allEpisodes.filter((episodeInfo) =>
    searchEpisode(episodeInfo, searchTerm)
  );

  //updating the app depending on the selected episode from the dropdown selector menu
  const selectFilteredEpisodes = allEpisodes.filter((episodeInfo) =>
    searchEpisode(episodeInfo, selectSearch)
  );

  // mapping the filtered results to the episodes via selector
  //if search bar is clear it shows all data
  const selectedEpisodes = selectFilteredEpisodes.map((data) => {
    // checking for null image data and displaying an error image
    //if null is found when displaying all episode data
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

  //mapping episode data depending on the search bar
  //if the search bar is empty it shows all data
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

  // the return statement for the MainContent so it is seetingup our formatting and
  //displaying the content depending on what the user selects
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
