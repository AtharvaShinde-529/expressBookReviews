const axios = require('axios');

const BASE_URL = "http://localhost:8800";

// Get all books
async function getAllBooks() {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    console.log(response.data);
  } catch (error) {
    console.error(error.message);
  }
}

// Get books by ISBN
async function getBooksByISBN(isbn) {
  try {
    const response = await axios.get(`${BASE_URL}/isbn/${isbn}`);
    console.log(response.data);
  } catch (error) {
    console.error(error.message);
  }
}

// Get books by author
async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(`${BASE_URL}/author/${encodeURIComponent(author)}`);
    console.log(response.data);
  } catch (error) {
    console.error(error.message);
  }
}

// Get books by title
async function getBooksByTitle(title) {
  try {
    const response = await axios.get(`${BASE_URL}/title/${encodeURIComponent(title)}`);
    console.log(response.data);
  } catch (error) {
    console.error(error.message);
  }
}

// Example usage
(async () => {
  await getAllBooks();
  await getBooksByISBN(1);
  await getBooksByAuthor("Chinua Achebe");
  await getBooksByTitle("Things Fall Apart");
})();
