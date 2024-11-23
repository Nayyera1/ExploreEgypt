const { exec } = require("child_process");

// Start backend
const backend = exec("cd ./backend && nodemon server.js");
backend.stdout.on("data", (data) => console.log(data));
backend.stderr.on("data", (data) => console.log(data));

// Start frontend
const frontend = exec("npm run start");
frontend.stdout.on("data", (data) => console.log(data));
frontend.stderr.on("data", (data) => console.log(data));
