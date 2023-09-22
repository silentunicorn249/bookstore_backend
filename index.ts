import express, { json } from "express";
import books from "./routes/books";
import mongoose from "mongoose";
import authors from "./routes/authors";
import auth from "./routes/auth";
import users from "./routes/users";
import user from "./routes/user";
import { logger } from "./middleware/logger";
const app = express();
app.use(json());
app.use(logger);

app.use("/", user);
app.use("/books", books);
app.use("/authors", authors);
app.use("/auth", auth);
app.use("/users", users);

mongoose
  .connect("mongodb+srv://mark:mark@cluster0.2q3nfl2.mongodb.net/bookstore")
  .then(() => {
    app.listen(3000, "0.0.0.0", () => console.log("App listening"));
  })
  .catch((err) => {
    console.log(err);
  });
