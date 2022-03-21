import { isPropertySignature } from "typescript";

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
  const seasonLength = () => {
    if (props.season < 10) {
      return (
        <h2>
          {props.name} S0{props.season}
        </h2>
      );
    } else {
      return (
        <h2>
          {props.name} S{props.season}
        </h2>
      );
    }
  };
  const episodeLength = () => {
    if (props.number < 10) {
      return <h2>E0{props.number}</h2>;
    } else {
      return <h2>E{props.number}</h2>;
    }
  };

  return (
    <div className="episode">
      <section>
        {seasonLength()} {episodeLength()}
      </section>
      <img
        src={props.image}
        alt="episode screen capture"
        className="episode--image"
      />
      {props.summary}
    </div>
  );
}
