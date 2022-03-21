import Episode from "./components/Episode";
import episodes from "./data/episodes.json";

function App(): JSX.Element {
  console.log("Imported, ", episodes.length, "episode(s)");
  console.log("First episodes name is ", episodes[0].name);
  return (
    <>
  <Episode/>
  </>
  )
}

export default App;
