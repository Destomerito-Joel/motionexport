export default defineNuxtPlugin(() => {
    if (process.client && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(() => {
        console.log("Service Worker Registered!");
      }).catch((error) => {
        console.error("Service Worker Registration Failed:", error);
      });
    }
  });
  