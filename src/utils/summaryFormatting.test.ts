import summaryFormatting from "./summaryFormatting";

test("Format Summary go that it removes the <p> tag", () => {
  expect(
    summaryFormatting("<p>this is a random summary that has been made up</p>")
  ).toBe("this is a random summary that has been made up");
  expect(
    summaryFormatting(
      "<p>Jon Snow attempts to find his place amongst the Night's Watch. Eddard and his daughters arrive at King's Landing.</p>"
    )
  ).toBe(
    "Jon Snow attempts to find his place amongst the Night's Watch. Eddard and his daughters arrive at King's Landing."
  );
});
