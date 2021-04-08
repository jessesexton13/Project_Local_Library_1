function getTotalBooksCount(books) {
  let result = books.length;
  return result;
}

function getTotalAccountsCount(accounts) {
  let result = accounts.length;
  return result;
}

function getBooksBorrowedCount(books) {
  let result = books.filter((book) => book.borrows[0].returned === false);
  return result.length;
}

function getMostCommonGenres(books) {
  const bookGenres = books.map((book) => book.genre);
  const temp = [];
  //map over book genres
  bookGenres.map((genre) => {
    //for each genre, first check to see if genre already exists in array
    const genreLocation = temp.findIndex((element) => element.name === genre);
    //second, if it exists, increase count by 1
    if (genreLocation >= 0) {
      temp[genreLocation].count = temp[genreLocation].count + 1;
      //else, if it don't exist, push a new genre object onto array with count of 1
    } else {
      temp.push({ name: genre, count: 1 });
    }
  });
  temp.sort((a, b) => b.count - a.count);
  if (temp.length > 5) {
    return temp.slice(0, 5);
  }
  return temp;
}

function getMostPopularBooks(books) {
  const booksArray = books
    .reduce((acc, book) => {
      return [...acc, { name: book.title, count: book.borrows.length }];
    }, [])
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  return booksArray;
}

// function getMostPopularAuthors(books, authors) {
//   let result = [];
//   for (let bkIdx = 0; bkIdx < books.length; bkIdx++) {
//     let count = 0;
//     if (books[bkIdx].authorId === authors.id) {
//       count = count + books[bkIdx].borrows.length;
//     }
//     result.push({ name: authors.first + authors.last, count }, []);
//   }
//   result.sort((a, b) => b.count - a.count).slice(0, 5);
//   return result;
// }

function getMostPopularAuthors(books, authors) {
  let result = [];
  for (let bkIdx = 0; bkIdx < books.length; bkIdx++) {
    let author = authors.find((author) => author.id === books[bkIdx].authorId);
    if (books[bkIdx].authorId === author.id) {
      count = books[bkIdx].borrows.length;
      result.push({ name: author.name.first + " " + author.name.last, count });
    }
  }
  result = result.sort((a, b) => b.count - a.count).slice(0, 5);
  return result;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
