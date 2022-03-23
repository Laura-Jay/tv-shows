import formattingSeasonAndEpisode from "./formattingSeasonAndEpisode";

test("Enter season and episode information and expect it paddedif needed", () => {
  expect(formattingSeasonAndEpisode(3, 5)).toBe("S03E05");
  expect(formattingSeasonAndEpisode(13, 15)).toBe("S13E15");
  expect(formattingSeasonAndEpisode(3, 15)).toBe("S03E15");
  expect(formattingSeasonAndEpisode(13, 5)).toBe("S13E05");
});
