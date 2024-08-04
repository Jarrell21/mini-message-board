var createError = require("http-errors");
const express = require("express");
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
var logger = require("morgan");
const assetsPath = path.join(__dirname, "public");
const app = express();
const PORT = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// add middlewares
app.use(logger("dev"));
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

// add router middlewares

// add routers
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function error(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { error: err });
});

app.listen(PORT, () =>
  console.log(`My first Express app - listening on port ${PORT}!`)
);
