interface EpisodeProps {
  //id: number;
  //url: string;
  name: string;
  season: number;
  number: number;
  //airdate: string;
  //aitstamp: string;
  //runtime: number;
  image: string;
  summary: string;
  //links: { self: { href: string } };
}

export default function Episode(props: EpisodeProps): JSX.Element {
  return (
    <div className="episode">
      <h2 className="episode--name">
        {props.name} - S{props.season}E{props.number}
      </h2>
      <img
        src={props.image}
        alt="episode screen capture"
        className="episode--image"
      />
      <p>{props.summary}</p>
    </div>
  );
}
