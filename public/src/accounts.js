function findAccountById(accounts, id) {
  let result = accounts.find((account) => account.id === id);
  return result;
}

function sortAccountsByLastName(accounts) {
  let result = accounts.sort((accountA, accountB) =>
    accountA.name.last < accountB.name.last ? -1 : 1
  );
  return result;
}

function getTotalNumberOfBorrows(account, books) {
  const accId = account.id;
  let total = 0;
  books.forEach((book) =>
    book.borrows.forEach((borrow) => accId === borrow.id && total++)
  );
  return total;
}

// function getBooksPossessedByAccount(account, books, authors) {
//   const accId = account.id;
//   const result = [];
//   for (let idxBks = 0; idxBks < books.length; idxBks++) {
//     if (
//       books[idxBks].borrows[0].id === accId &&
//       books[idxBks].borrows[0].returned === false
//     ) {
//       result.push(books[idxBks]);
//     }
//     for (let idxAuth = 0; idxAuth < authors.length; idxAuth++) {
//       let authorIdx = authors[idxAuth];
//       if (authorIdx.id === result.authorId) {
//         return result.push(authorIdx);
//       }
//     }
//   }
//   return result;
// }

function getBooksPossessedByAccount(account, books, authors) {
  const accId = account.id;
  const result = [];
  for (let idxBks = 0; idxBks < books.length; idxBks++) {
    for (let brsIdx = 0; brsIdx < books[idxBks].borrows.length; brsIdx++) {
      if (
        books[idxBks].borrows[brsIdx].id === accId &&
        books[idxBks].borrows[brsIdx].returned === false
      ) {
        books[idxBks].author = authors.find(
          (author) => author.id === books[idxBks].authorId
        );
        result.push(books[idxBks]);
      }
    }
  }
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
