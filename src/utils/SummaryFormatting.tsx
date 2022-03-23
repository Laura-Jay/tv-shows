export default function SummaryFormatting(summary: string): string {
  return summary.replace(/<\/?p[^>]*>/g, "");
}
