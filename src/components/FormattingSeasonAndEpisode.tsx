export default function FormattSeason(season: number, number: number): string {
  const seasonFormatted = season.toString().padStart(2, "0");
  const episodeFormatted = number.toString().padStart(2, "0");

  return `S${seasonFormatted}E${episodeFormatted}`;
}
