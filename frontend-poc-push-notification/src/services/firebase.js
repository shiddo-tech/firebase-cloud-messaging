// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2NuNwFVceNJ7wmMw6Ujnhm0nBvhDFhyg",
  authDomain: "poc-push-notification-619cd.firebaseapp.com",
  projectId: "poc-push-notification-619cd",
  storageBucket: "poc-push-notification-619cd.appspot.com",
  messagingSenderId: "862734434973",
  appId: "1:862734434973:web:42b1870071aa1459f64a74",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
messaging.app
  .getToken(messaging, {
    vapidKey:
      "BL85AyvGyz0JnMSJOHPDHa78qrJ61ze7Qsw-esinoBZI_YXL8yF-NhRYnhRLE0Qdbnj8TntbDj8YAoJuW4B4lk8",
  })
  .then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      console.log("Token available: ", currentToken);

      fetch("http://localhost:3001/push-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: currentToken }),
      });
    } else {
      // Show permission request UI
      console.log(
        "No registration token available. Request permission to generate one."
      );
      // ...
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
    // ...
  });

export { app, messaging };
