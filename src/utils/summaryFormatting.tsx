// we are searching through episode summary to remaove html tags that might be present
//we also return a message if summary is null
export default function summaryFormatting(summary: string): string {
  if (summary) {
    let remove = summary.replace(/<\/?p[^>]*>/g, "");
    remove = remove.replace(/<\/?b[^>]*>/g, "");
    return remove.replace(/<\/?i[^>]*>/g, " ");
  } else {
    return "No summary found";
  }
}
