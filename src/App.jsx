import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const initialSessionTime = 25;
  const initialBreakTime = 5;

  const [sessionSession, setSessionSession] = useState({
    time: initialSessionTime,
  });
  const [breakSession, setBreakSession] = useState({
    time: initialBreakTime,
  });
  const [running, setRunning] = useState(false);
  const [displayTime, setDisplayTime] = useState({
    sessionTime: sessionSession.time * 60,
    breakTime: breakSession.time * 60,
  });

  const handleBreakTime = (e) => {
    switch (e.target.id) {
      case "break-increment":
        setBreakSession({ time: breakSession.time + 1 });
        setDisplayTime({
          ...displayTime,
          breakTime: displayTime.breakTime + 60,
        });
        break;
      case "break-decrement":
        if (displayTime.breakTime > 60) {
          setBreakSession({ time: breakSession.time - 1 });
          setDisplayTime({
            ...displayTime,
            breakTime: displayTime.breakTime - 60,
          });
        }
        break;
      default:
        break;
    }
  };

  const handleSessionTime = (e) => {
    switch (e.target.id) {
      case "session-increment":
        setSessionSession({ time: sessionSession.time + 1 });
        setDisplayTime({
          ...displayTime,
          sessionTime: displayTime.sessionTime + 60,
        });
        break;
      case "session-decrement":
        if (displayTime.sessionTime > 60) {
          setSessionSession({ time: sessionSession.time - 1 });
          setDisplayTime({
            ...displayTime,
            sessionTime: displayTime.sessionTime - 60,
          });
        }
        break;
      default:
        break;
    }
  };

  const handlePlayButton = () => {
    setRunning(true);
  };

  const handlePauseButton = () => {
    setTimeout(() => {
      setRunning(false);
    }, 500);
  };

  const timeDisplayer = (sec) => {
    if (sec % 60 < 10) {
      const secondleft = "0" + (sec % 60);
      return Math.floor(sec / 60) + ":" + secondleft;
    }
    return Math.floor(sec / 60) + ":" + (sec % 60);
  };

  useEffect(() => {
    if (running) {
      if (displayTime.sessionTime > 0) {
        setTimeout(() => {
          setDisplayTime({
            ...displayTime,
            sessionTime: displayTime.sessionTime - 1,
          });
          // }, 1);
        }, 1000);
      } else if (displayTime.breakTime > 0) {
        setTimeout(() => {
          setDisplayTime({
            ...displayTime,
            breakTime: displayTime.breakTime - 1,
          });
        }, 1000);
      } else {
        setRunning(false);
        setDisplayTime({
          sessionTime: sessionSession.time * 60,
          breakTime: breakSession.time * 60,
        });
      }
    }
    console.log(running, displayTime);
  }, [running, displayTime, sessionSession.time, breakSession.time]);

  const handleResetButton = () => {
    setRunning(false);
    setDisplayTime({
      sessionTime: 25 * 60,
      breakTime: 5 * 60,
    });
    setBreakSession({ time: initialBreakTime });
    setSessionSession({ time: initialSessionTime });
  };

  return (
    <div id="app-container">
      <h1>25 + 5 Clock</h1>

      <div id="inputs">
        <div>
          Session Length
          <div id="session-label">
            <button id="session-increment" onClick={handleSessionTime}>
              +
            </button>
            <p>{sessionSession.time}</p>
            <button id="session-decrement" onClick={handleSessionTime}>
              -
            </button>
          </div>
        </div>

        <div>
          Break Length
          <div id="break-label">
            <button id="break-increment" onClick={handleBreakTime}>
              +
            </button>
            <p>{breakSession.time}</p>
            <button id="break-decrement" onClick={handleBreakTime}>
              -
            </button>
          </div>
        </div>
      </div>
      <div id="session">
        {displayTime.sessionTime > 0 ? "Session" : "Break"}
        <span>
          {displayTime.sessionTime > 0
            ? timeDisplayer(displayTime.sessionTime)
            : timeDisplayer(displayTime.breakTime)}
        </span>
      </div>
      <div id="buttons">
        {running ? (
          <button onClick={handlePauseButton}>Pause</button>
        ) : (
          <>
            <button
              onClick={handlePlayButton}
              style={{
                background: running ? "green" : "",
                color: running ? "white" : "",
              }}
            >
              Play
            </button>
            <button onClick={handleResetButton}>Reset</button>
          </>
        )}
      </div>
      <p id="footer">Made by Dimnyan</p>
    </div>
  );
}

export default App;
