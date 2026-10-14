const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
let users = [];

const isValid = (username) => users.some(u => u.username === username);
const authenticatedUser = (username, password) => users.some(u => u.username === username && u.password === password);

regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({message: "Username and password required"});
  if (!authenticatedUser(username, password)) return res.status(401).json({message: "Invalid credentials"});
  const accessToken = jwt.sign({ data: username }, "access", { expiresIn: 60 * 60 });
  req.session.authorization = { accessToken, username };
  return res.status(200).json({message: "Login successful!"});
});

regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;
  const username = req.session.authorization?.username;
  if (!username) return res.status(403).json({message: "User not logged in"});
  if (!books[isbn]) return res.status(404).json({message: "Book not found"});
  if (!review) return res.status(400).json({message: "Review required"});

  books[isbn].reviews[username] = review;
  return res.status(200).json({
    message: "Review successfully added/modified",
    reviews: books[isbn].reviews
  });
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization?.username;
  if (!username) return res.status(403).json({message: "User not logged in"});
  if (!books[isbn]) return res.status(404).json({message: "Book not found"});
  if (books[isbn].reviews[username]) {
    delete books[isbn].reviews[username];
    return res.status(200).json({message: "Review successfully deleted"});
  }
  return res.status(404).json({message: "No review found"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
