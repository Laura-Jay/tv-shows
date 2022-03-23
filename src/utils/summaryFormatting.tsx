export default function summaryFormatting(summary: string): string {
  const removeP = summary.replace(/<\/?p[^>]*>/g, "");
  return removeP.replace(/<\/?b[^>]*>/g, "");
}
