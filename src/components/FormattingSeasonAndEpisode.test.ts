import FormattingSeasonAndEpisode from "./FormattingSeasonAndEpisode";

test("Enter season and episode information and expect it paddedif needed", () => {
  expect(FormattingSeasonAndEpisode(3, 5)).toBe("S03E05");
  expect(FormattingSeasonAndEpisode(13, 15)).toBe("S13E15");
  expect(FormattingSeasonAndEpisode(3, 15)).toBe("S03E15");
  expect(FormattingSeasonAndEpisode(13, 5)).toBe("S13E05");
});
