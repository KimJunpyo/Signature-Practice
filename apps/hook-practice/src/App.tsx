import "./App.css";
import Reducer from "./Reducer";
import { ThemeComponent, ThemeProvider } from "./Theme";

function App() {
  return (
    <>
      <Reducer />
      <ThemeProvider>
        <ThemeComponent />
      </ThemeProvider>
    </>
  );
}

export default App;
