import "./App.css";

function App() {
  return (
    <div id="app-container">
      <h1>25 + 5 Clock</h1>

      <div id="inputs">
        Break Length <input type="number" />
        Session Length <input type="number" />
      </div>
      <div id="session">
        Session
        <span>25:00</span>
        <div>
          <button>Play</button>
          <button>Pause</button>
          <button>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
