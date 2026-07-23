let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');

let app = express();

// 1. Meet the Node console
console.log("Hello World");

// 2. Serve static assets
app.use("/public", express.static(path.join(__dirname, "public")));

// 3. Body parser
app.use(bodyParser.urlencoded({ extended: false }));

// 4. Root-level middleware logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// 5. Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// 6. JSON endpoint
app.get("/json", (req, res) => {
  let message = "Hello json";

  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }

  res.json({ message });
});

// 7. Chain middleware
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

// 8. Route parameter
app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

// 9. Query parameter
app.get("/name", (req, res) => {
  const { first, last } = req.query;
  res.json({ name: `${first} ${last}` });
});

// 10. POST request
app.post("/name", (req, res) => {
  const { first, last } = req.body;
  res.json({ name: `${first} ${last}` });
});

module.exports = app;
