const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({message: "Username and password are required"});
  }

  if (isValid(username)) {
    return res.status(409).json({message: "User already exists"});
  }

  users.push({username, password});
  return res.status(201).json({message: "User successfully registered. Now you can login"});
});

public_users.get('/', function (req, res) {
  return res.status(200).json(books);
});

public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn]);
  }
  return res.status(404).json({message: "Book not found"});
});

public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const filtered = {};
  Object.keys(books).forEach(isbn => {
    if (books[isbn].author === author) {
      filtered[isbn] = books[isbn];
    }
  });
  if (Object.keys(filtered).length > 0) {
    return res.status(200).json(filtered);
  }
  return res.status(404).json({message: "No books found by this author"});
});

public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const filtered = {};
  Object.keys(books).forEach(isbn => {
    if (books[isbn].title === title) {
      filtered[isbn] = books[isbn];
    }
  });
  if (Object.keys(filtered).length > 0) {
    return res.status(200).json(filtered);
  }
  return res.status(404).json({message: "No books found with this title"});
});

public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews);
  }
  return res.status(404).json({message: "Book not found"});
});

module.exports.general = public_users;
