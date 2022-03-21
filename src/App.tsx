import Episode from "./components/Episode";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import episodesData from "./data/episodesData.json";
import "./styles.css";

function App(): JSX.Element {
  console.log("Imported, ", episodesData.length, "episode(s)");
  console.log("First episodes name is ", episodesData[0].name);

  const episodes = episodesData.map((data) => {
    return (
      <>
        <Navbar />
        <Episode
          key={data.id}
          name={data.name}
          season={data.season}
          number={data.number}
          image={data.image.medium}
          summary={data.summary.replace(/<\/?p[^>]*>/g, "")}
        />
        <Footer />
      </>
    );
  });

  return <>{episodes}</>;
}

export default App;
