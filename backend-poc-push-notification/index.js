const express = require("express");
const cors = require("cors");
const { initializeApp, cert } = require("firebase-admin/app");
const { getMessaging } = require("firebase-admin/messaging");
const serviceAccount = require("./service-account-credentials.json");
const app = express();
const port = 3001;

let subscription;

app.use(cors());
app.use(express.json());

const firebaseConfig = {
  credential: cert(serviceAccount),
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

app.post("/push-subscription", (req, res) => {
  console.log("push-subscription: ", req.body);
  subscription = req.body;
});

app.post("/notify-me", (req, res) => {
  console.log("triggered notification");
  sendNotification(subscription);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function sendNotification() {
  const message = {
    data: {
      title: "Hello from server!",
      body: "Description from server",
    },
    token: subscription.token,
  };

  messaging
    .send(message)
    .then((response) => {
      console.log("Sucessfully sent message: ", response);
    })
    .catch((err) => {
      console.log("Error sending message: ", err);
    });
}
