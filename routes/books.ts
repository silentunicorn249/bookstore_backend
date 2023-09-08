import { Request, Response, Router } from "express";
import Book from "../models/Book";
import { ObjectId } from "mongodb";
import { validateID } from "../middleware/objectIDValidation";
import { authenticationGuard } from "../middleware/authenticationGuard";

const books = Router();

books.get(
  "/",
  [authenticationGuard],
  async (req: Request<{}, {}, {}, { page: number }>, res) => {
    const pageNumber = req.query.page || 0;
    const pageSize = pageNumber ? 3 : 0;
    const books = await Book.find()
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .populate("author", "name -_id");
    res.send(books);
  }
);

books.get("/:id", [validateID], async (req: Request, res: Response) => {
  const ressult = await Book.find({ _id: req.params.id });
  console.log(ressult);
  res.send(ressult);
});

books.post("", async (req, res) => {
  //   const book = req.body;
  //   console.log(book);
  const book = new Book({
    title: "New Book",
    pages: 1000,
    image:
      "https://as1.ftcdn.net/v2/jpg/05/08/02/74/1000_F_508027415_4QUICcSCBjIkykkZPVFrsF5gaVEuYvmB.jpg",
    rating: 10,
  });
  const result = await book.save();
  console.log(result);
});

books.delete("/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ msg: "Invalid ID" });
  }
  const result = await Book.deleteOne({ _id: req.params.id });
  res.send(result);
});

books.patch("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ msg: "Invalid ID" });
  }

  const updates = req.body;
});

export default books;
