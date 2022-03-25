export default function FormattSeason(season: number, number: number): string {
  // adding a 0 at the begining of the season or episode length if it is too short
  const seasonFormatted = season.toString().padStart(2, "0");
  const episodeFormatted = number.toString().padStart(2, "0");

  return `S${seasonFormatted}E${episodeFormatted}`;
}
