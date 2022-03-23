import searchEpisode from "./searchEpisode";
import episodesData from "../data/episodesData.json";

test("Enter episode data and search term and returns episodes that match", () => {
  expect(searchEpisode(episodesData[3], "cri")).toBe(episodesData[3]);
  expect(searchEpisode(episodesData[1], "cri")).toBe("");
  expect(searchEpisode(episodesData[0], "coming")).toBe(episodesData[0]);
  expect(searchEpisode(episodesData[5], "coming")).toBe("");
});
