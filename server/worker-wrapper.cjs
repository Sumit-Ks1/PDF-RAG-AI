import("./worker.js")
  .then(() => {
    console.log("Worker started");
  })
  .catch((err) => {
    console.error("Failed starting worker", err);
  });
