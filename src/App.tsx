import { greet } from "./utils/greet";
import episodes from "./data/episodes.json";

function App(): JSX.Element {
  console.log("Imported, ", episodes.length, "episode(s)");
  console.log("First episodes name is ", episodes[0].name);

  return <h1>{greet("World")}</h1>;
}

export default App;
