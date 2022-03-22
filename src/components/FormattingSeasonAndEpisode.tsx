export default function FormattSeason(season: number, number: number): string {
  let seasonFormatted = season.toString().padStart(2, "0");
  let episodeFormatted = number.toString().padStart(2, "0");

  return `S${seasonFormatted}E${episodeFormatted}`;
}
