import '../../images/lotr_fotr.jpg';
import '../../images/lotr_trotk.jpg';
import '../../images/lotr_tt.jpg';
import '../../images/hp_athps.jpg';
import '../../images/hp_cos.jpg';
import '../../images/hp_poa.jpg';
import '../../images/hp_tgof.jpg';
import '../../images/hp_thbp.jpg';
import '../../images/hp_atdh.jpg';

import {
  contains,
  delay,
  generateUID
} from '../../utils/';

import {
  Book
} from './Book';

let BOOK_DATA = [
  createMockBook(generateUID(), 'Lord of the rings', 'Fellowshing of the ring', 'J. R. R. Tolkien', '/lotr_fotr.jpg'),
  createMockBook(generateUID(), 'Lord of the rings', 'The Two Towers', 'J. R. R. Tolkien', '/lotr_tt.jpg'),
  createMockBook(generateUID(), 'Lord of the rings', 'The Return of The King', 'J. R. R. Tolkien', '/lotr_trotk.jpg'),
  createMockBook(generateUID(), 'Harry Potter', 'and the sorcerer\'s stone', ' Rowling, J. K', '/hp_athps.jpg'),
  createMockBook(generateUID(), 'Harry Potter', 'and the chamber of secrets', ' Rowling, J. K', '/hp_cos.jpg'),
  createMockBook(generateUID(), 'Harry Potter', 'and the prisoner of Azkaban', ' Rowling, J. K', '/hp_poa.jpg'),
  createMockBook(generateUID(), 'Harry Potter', 'and the goblet of fire', ' Rowling, J. K', '/hp_tgof.jpg'),
  createMockBook(generateUID(), 'Harry Potter', 'and the half blood prince', ' Rowling, J. K', '/hp_thbp.jpg'),
  createMockBook(generateUID(), 'Harry Potter', 'and the deathly hallows', ' Rowling, J. K', '/hp_atdh.jpg')
];

export class Api {

  static getAllBooks() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...BOOK_DATA]);
      }, delay);
    });
  }

  static searchBooks(queryText) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundBookData = [];
        BOOK_DATA.forEach(book => {
          if (contains(book[Book.AUTHOR], queryText) ||
            contains(book[Book.TITLE], queryText) ||
            contains(book[Book.SUB_TITLE], queryText)) {
            foundBookData.push(Object.assign({}, book));
          }
        });
        resolve(foundBookData);
      }, 200);
    });
  }

  static createBook(book) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const books = [...BOOK_DATA];
          const bookId = generateUID();
          const newBook = Object.assign({}, {
            ...book,
            _id: bookId
          });
          const filterd = BOOK_DATA.filter(storedBook => storedBook[Book.ISBN10].indexOf(book[Book.ISBN10]) > -1 ||
            storedBook[Book.ISBN13].indexOf(book[Book.ISBN13]) > -1);
          if (!filterd || filterd.length === 0) {
            books.push(newBook);
            BOOK_DATA = books;
            resolve(newBook);
          } else {
            reject(new Error({
              data: `${book[Book.TITLE]} is already saved in the database.`
            }));
          }
        } catch (err) {
          reject(err);
        }
      }, delay);
    });
  }

  static updateBook(bookId, updatedBook) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let books = [...BOOK_DATA];
          BOOK_DATA.forEach((book, index) => {
            if (book[Book.BOOK_ID] === bookId) {
              books[index] = updatedBook;
            }
          });
          BOOK_DATA = books;
          resolve(Object.assign({}, {
            ...updatedBook
          }));
        } catch (err) {
          reject(err);
        }
      }, delay);
    });
  }

  static deleteBook(bookId) {
    return new Promise((resolve, reject) => {
      let books = [...BOOK_DATA];
      try {
        BOOK_DATA.forEach((book, index) => {
          if (book[Book.BOOK_ID] === bookId) {
            books.splice(index, 1);
          }
        });
        BOOK_DATA = books;
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  static checkIfIdentifierExists(identifier = { type: 'ISBN_10', identifier: '' }) {
    return new Promise((resolve) => {
      let exists = false;
      const books = [...BOOK_DATA];
      switch (identifier.type) {
        case 'ISBN_10':
          exists = books.filter(book => book[Book.ISBN10] && book[Book.ISBN10].indexOf(identifier.identifier) > -1).length > 0;
          break;
        case 'ISBN_13':
          exists = books.filter(book => book[Book.ISBN13] && book[Book.ISBN13].indexOf(identifier.identifier) > -1).length > 0;
          break;
      }
      resolve({
        result: exists,
        message: exists ? 'Book already exists.' : ''
      });
    });
  }

  static getBookById(bookId) {
    return new Promise((resolve, reject) => {
      const books = [...BOOK_DATA];
      const filtered = books.filter(book => book[Book.BOOK_ID] === bookId);
      if (filtered && filtered.length > 0) {
        resolve(filtered[0]);
      } else {
        reject({
          message: 'Book not found.'
        });
      }
    });
  }
}

function createMockBook(id, title, subtitle, author, imageUrl) {
  const book = {};
  book[Book.BOOK_ID] = id;
  book[Book.AUTHOR] = [author];
  book[Book.SUB_TITLE] = subtitle;
  book[Book.TITLE] = title;
  book[Book.IMAGE_URL] = imageUrl;
  book[Book.PUBLISHER] = 'The book publisher';
  book[Book.EDITION] = '2nd Edition';
  book[Book.ISBN10] = '1234554657';
  book[Book.ISBN13] = '1234554657';
  book[Book.PUBLISHED_DATE] = '1991';
  book[Book.SUBJECTS] = [
    '650|17$aCareer Exploration.$2ericd',
    '650|#0$aBallads, English$zHudson River Valley (N.Y. and N.J.)',
    '650|#0$aRain and rainfall$zWashington (State)$zSeattle$vMaps'
  ];
  return book;
}
