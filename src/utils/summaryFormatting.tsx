export default function summaryFormatting(summary: string): string {
  return summary.replace(/<\/?p[^>]*>/g, "");
}
