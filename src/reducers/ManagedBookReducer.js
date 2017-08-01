import { ADD_MANAGED_BOOK, ADD_SUBJECT_TO_MANAGED_BOOK, CANCEL_MANAGED_BOOK, CREATE_NEW_BOOK_FROM_GOOGLE, INVALID_MANAGED_BOOK, LOAD_MANAGED_BOOK_SUCCESS, REMOVE_MANAGED_BOOK_SUBJECT, SET_MANAGED_BOOK_FIELD_VALUE, SET_TAB_EVENT_KEY, UPDATE_MANAGED_BOOK, UPDATE_MANAGED_SUBJECT } from '../actions/';

import { Book } from '../api/books/Book';
import initialState from './initialState';

export default function managedBookReducer(state = initialState.book, action) {
  switch (action.type) {
    case CREATE_NEW_BOOK_FROM_GOOGLE:
      {
        const newBook = { ...initialState.book, touched: true, active: true };
        newBook[Book.TITLE] = action.book.title;
        newBook[Book.AUTHOR] = action.book.authors;
        newBook[Book.PUBLISHER] = action.book.publisher;
        newBook[Book.PUBLISHED_DATE] = action.book.publishedDate;
        newBook[Book.IMAGE_URL] = action.book.imageLinks ? action.book.imageLinks.thumbnail : '';
        newBook[Book.ISBN] = action.book.industryIdentifiers[0].identifier;
        newBook[Book.SOURCE_ID] = action.bookId;
        newBook[Book.SUMMARY] = action.book.description;
        newBook[Book.SUB_TITLE] = action.book.subtitle;
        newBook[Book.NUMBER_OF_PAGES] = action.book.printedPageCount;
        return newBook;
      }
    case INVALID_MANAGED_BOOK:
      {
        return Object.assign({}, {
          ...state, invalid: true,
          invalidMessage: action.invalidMessage,
          invalidField: action.invalidField
        });
      }
    case SET_MANAGED_BOOK_FIELD_VALUE:
      {
        if (Object.values(Book).indexOf(action.field) > -1) {
          state = Object.assign({}, { ...state, touched: true, active: true });
          state[action.field] = action.value;
          if (state.invalid && state.invalidField === action.field) {
            state.invalid = false;
            state.invalidMessage = undefined;
            state.invalidField = undefined;
          }
        }
        return state;
      }
    case REMOVE_MANAGED_BOOK_SUBJECT:
      {
        const subjects = [...state.subjects];
        subjects.splice(action.index, 1);
        return Object.assign({}, { ...state, subjects });
      }
    case LOAD_MANAGED_BOOK_SUCCESS:
      {
        if (!action.book) {
          state = Object.assign({}, initialState.book);
        } else {
          state = Object.assign({}, { ...state, ...action.book });
        }
        if (!state.tabEventKey) {
          state.tabEventKey = initialState.book.tabEventKey;
        }
        state.active = true;
        return state;
      }
    case ADD_SUBJECT_TO_MANAGED_BOOK:
      {
        const subjects = [...state.subjects, action.subject];
        return Object.assign({}, { ...state, subjects });
      }
    case UPDATE_MANAGED_SUBJECT:
      {
        const subjects = [...state.subjects];
        subjects[action.index] = action.subject;
        return Object.assign({}, { ...state, subjects });
      }
    case CANCEL_MANAGED_BOOK:
    case ADD_MANAGED_BOOK:
    case UPDATE_MANAGED_BOOK:
      {
        return initialState.book;
      }
    case SET_TAB_EVENT_KEY:
      {
        return Object.assign({}, { ...state, tabEventKey: action.eventKey });
      }
    default:
      return state;
  }
}
