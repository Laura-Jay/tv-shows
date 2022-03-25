import formattingSeasonAndEpisode from "../utils/formattingSeasonAndEpisode";

//setting up interface for the parts of episode data that we use
interface EpisodeProps {
  name: string;
  season: number;
  number: number;
  image: string;
  summary: string;
}

export default function Episode(props: EpisodeProps): JSX.Element {
  //returning the episode data in a formatted style
  return (
    <section className="episode">
      <h2 className="episode--name">
        {" "}
        {props.name} - {formattingSeasonAndEpisode(props.season, props.number)}
      </h2>

      <img
        src={props.image}
        alt="episode screen capture"
        className="episode--image"
      />
      <p>{props.summary}</p>
    </section>
  );
}
