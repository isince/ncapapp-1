import Result from "./pages/result/Result";
import Nav from "./components/nav/Nav";
import Map from "./components/map/Map";

import "leaflet/dist/leaflet.css";
import "./App.css";

function App() {
  return (
    <div className="flex flex-row">
      <Nav />
      <Result />
      <Map className="flex-auto" />
    </div>
  );
}

export default App;
