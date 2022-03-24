export default function summaryFormatting(summary: string): string {
  if (summary) {
    let remove = summary.replace(/<\/?p[^>]*>/g, "");
    remove = remove.replace(/<\/?b[^>]*>/g, "");
    return remove.replace(/<\/?i[^>]*>/g, " ");
  } else {
    return "No summary found";
  }
}
