import './App.css';
import GoodsList from './components/GoodsList/GoodsList';
import CreateForm from './components/CreateForm/CreateForm';
import ResizePanel from "react-resize-panel";

function App() {
  return (
    <div className="App">
      <ResizePanel style={{ minWidth: "30%", maxWidth: "60%" }}
        borderClass="customBorder"
        handleClass="customHandle"
        direction="e">
        <CreateForm />
      </ResizePanel>
      <GoodsList />
    </div>
  );
}

export default App;
