self.addEventListener("push", (event) => {
  const { notification } = event.data.json();
  console.log("RECEIVED: ", notification);

  self.registration.showNotification(notification.title, notification.options);
});
