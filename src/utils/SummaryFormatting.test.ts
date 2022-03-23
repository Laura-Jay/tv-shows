import SummaryFormatting from "./SummaryFormatting";

test("Format Summary go that it removes the <p> tag", () => {
  expect(
    SummaryFormatting("<p>this is a random summary that has been made up</p>")
  ).toBe("this is a random summary that has been made up");
  expect(
    SummaryFormatting(
      "<p>Jon Snow attempts to find his place amongst the Night's Watch. Eddard and his daughters arrive at King's Landing.</p>"
    )
  ).toBe(
    "Jon Snow attempts to find his place amongst the Night's Watch. Eddard and his daughters arrive at King's Landing."
  );
});
