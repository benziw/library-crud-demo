import InputBookForm from "./components/InputBookForm";
import DisplayBooks from "./components/DisplayBooks";

import './css/App.css'

function App() {

  return (
    <div className="App">
      <h1>library database</h1>

      <InputBookForm/>
      <DisplayBooks />

    </div>
  );
}

export default App;
