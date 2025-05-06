// This file is CommonJS but only serves to dynamically load your ESM entry point.
import("./index.js")
  .then(() => {
    // Optionally log that the app has started.
    console.log("Express app started");
  })
  .catch((err) => {
    console.error("Failed starting express app", err);
  });
