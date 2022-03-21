export default function Navbar(): JSX.Element {
  return (
    <nav className="navbar">
      <h1 className="title">Episode Guide</h1>
      <div className="searchbar">
        <p>Search:</p>
        <input type="text" placeholder="Search an episode" />
      </div>
    </nav>
  );
}
