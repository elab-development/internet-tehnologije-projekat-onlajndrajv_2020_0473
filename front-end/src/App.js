import logo from "./logo.svg";
import "./App.css";
import NavBar from "./NavBar";
import AllFiles from "./AllFiles";

const files = [
  {
    title: "File 1",
  },
  {
    title: "File 2",
  },
  {
    title: "File 3",
  },
  {
    title: "File 4",
  },
  {
    title: "File 5",
  },
  {
    title: "File 6",
  }
];

function App() {
  return (
    <div className="app">
      <NavBar />
      <AllFiles files={files} />
    </div>
  );
}

export default App;
