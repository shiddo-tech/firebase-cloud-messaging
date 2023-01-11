import "./App.css";
import { app } from "./services/firebase";

function App() {
  async function requestUserPermissions() {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();

      if (permission === "denied") {
        alert("The user explicit denied the permission request!");
        console.error("The user explicit denied the permission request!");
        return;
      }

      if (permission === "granted") {
        console.info("The user accepted the permission request!");
      }
    }
  }

  function triggerNotification() {
    fetch("http://localhost:3001/notify-me", {
      method: "POST",
    });
  }

  return (
    <div>
      <button onClick={requestUserPermissions}>Allow notifications</button>
      <button onClick={triggerNotification}>Trigger notification</button>
    </div>
  );
}

export default App;
