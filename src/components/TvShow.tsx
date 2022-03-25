import summaryFormatting from "../utils/summaryFormatting";

// setting up the interface for the tv show data to be displayed
interface TVShowsProps {
  key: number;
  name: string;
  genres: string[];
  status: string;
  runtime?: number | null;
  rating: number | null;
  image: string;
  summary: string;
}

//returning the tv show data in a formatted style
function TvShow(props: TVShowsProps): JSX.Element {
  return (
    <section className="tvshow">
      <h2 className="tvshow--name"> {props.name}</h2>
      <ul>
        <li>Genre: {props.genres}</li>
        <li>Status: {props.status}</li>
        <li>RunTime: {props.runtime}</li>
        <li>Rating: {props.rating}</li>
      </ul>
      <img
        src={props.image}
        alt="episode screen capture"
        className="tvshow--image"
      />
      <p>{summaryFormatting(props.summary)}</p>
    </section>
  );
}

export default TvShow;
