interface TvShowProps {
  key: number;
  name: string;
  image: string;
  genres: string[];
  summary: string;
  status: string;
  rating: number | null;
  runtime: number | null;
  handleClick: () => void;
}

export default function TvShow(props: TvShowProps): JSX.Element {
  return (
    <section className="tv-show-list-item" onClick={props.handleClick}>
      <div className="tv-show-hero">
        <h2 className="show--name">{props.name}</h2>
        <img
          src={props.image}
          alt="show screen capture"
          className="show--image"
        />
      </div>
      <p className="tv-show-summary">Summary: {props.summary}</p>
      <div className="tv-show-list-stats">
        <ul>
          <li>Genres: {props.genres}</li>
          <li>Status: {props.status}</li>
          <li>Rating: {props.rating}</li>
          <li>Runtime: {props.runtime}</li>
        </ul>
      </div>
    </section>
  );
}
