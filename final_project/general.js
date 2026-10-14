const axios = require('axios');

const BASE_URL = "http://localhost:8800";

// Get all books - returns the full list of books
async function getAllBooks() {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    return response.data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

// Get book details based on ISBN - returns the book object
async function getBooksByISBN(isbn) {
  try {
    const response = await axios.get(`${BASE_URL}/isbn/${isbn}`);
    return response.data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

// Get books based on Author - returns matching books
async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(`${BASE_URL}/author/${encodeURIComponent(author)}`);
    return response.data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

// Get books based on Title - returns matching books
async function getBooksByTitle(title) {
  try {
    const response = await axios.get(`${BASE_URL}/title/${encodeURIComponent(title)}`);
    return response.data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

module.exports = { getAllBooks, getBooksByISBN, getBooksByAuthor, getBooksByTitle };
