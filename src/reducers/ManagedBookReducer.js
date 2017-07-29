import { ADD_MANAGED_BOOK, ADD_SUBJECT_TO_MANAGED_BOOK, CANCEL_MANAGED_BOOK, LOAD_MANAGED_BOOK_SUCCESS, REMOVE_MANAGED_BOOK_SUBJECT, SET_MANAGED_BOOK_FIELD_VALUE, SET_TAB_EVENT_KEY, UPDATE_MANAGED_SUBJECT } from '../actions/';

import Book from '../api/books/Book';
import initialState from './initialState';

export default function managedBookReducer(state = initialState.book, action) {
    switch (action.type) {
        case SET_MANAGED_BOOK_FIELD_VALUE: {
            if (Object.values(Book).indexOf(action.field) > -1) {
                state = Object.assign({}, { ...state, touched: true, active: true });
                state[action.field] = action.value;
            }
            return state;
        }
        case REMOVE_MANAGED_BOOK_SUBJECT: {
            const subjects = [...state.subjects];
            subjects.splice(action.index, 1);
            return Object.assign({}, { ...state, subjects });
        }
        case LOAD_MANAGED_BOOK_SUCCESS: {
            if (!action.book) {
                state = Object.assign({}, initialState.book);
            } else {
                state = Object.assign({}, { ...state, ...action.book });
            }
            state.active = true;
            return state;
        }
        case ADD_SUBJECT_TO_MANAGED_BOOK: {
            const subjects = [...state.subjects, action.subject];
            return Object.assign({}, { ...state, subjects });
        }
        case UPDATE_MANAGED_SUBJECT: {
            const subjects = [...state.subjects];
            subjects[action.index] = action.subject;
            return Object.assign({}, { ...state, subjects });
        }
        case CANCEL_MANAGED_BOOK:
        case ADD_MANAGED_BOOK: {
            return initialState.book;
        }
        case SET_TAB_EVENT_KEY: { return Object.assign({}, { ...state, tabEventKey: action.eventKey }); }
        default:
            return state;
    }
}
