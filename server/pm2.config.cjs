// pm2.config.cjs
module.exports = {
    apps: [
      {
        name: "express-app",
        script: "index-wrapper.cjs",
        watch: false,
        env: {
          PORT: 8000
        }
      },
      {
        name: "worker",
        script: "worker-wrapper.cjs",
        watch: false
      }
    ]
  };
  