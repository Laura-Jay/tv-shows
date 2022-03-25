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
      <h2 className="show--name">{props.name}</h2>

      <img
        src={props.image}
        alt="show screen capture"
        className="show--image"
      />
      <p>{props.genres}</p>
      <p>{props.summary}</p>
      <p>{props.status}</p>
      <p>{props.rating}</p>
      <p>{props.runtime}</p>
    </section>
  );
}
