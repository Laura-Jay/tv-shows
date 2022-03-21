interface EpisodeProps{
    id: number,
    url: string,
    name: string,
    season: number,
    number: number,
    airdate: string,
    aitstamp: string,
    runtime: number,
   image: {medium: string; original: string },
    summary: string,
   links:{ self: { href: string}};
}

export default function Episode(props: EpisodeProps): JSX.Element{
    return (
        <div className="episode">
<h3>{props.name} - S{props.season}E{props.number}</h3>
<img src={props.image.medium} alt="episode screen capture"/>
{props.summary}
        </div>
    )
}