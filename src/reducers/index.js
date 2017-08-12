import ajaxGlobal from './AjaxGlobalReducer';
import appModal from './AppModalReducer';
import bookPreview from './BookPreviewReducer';
import books from './BookReducer';
import { combineReducers } from 'redux';
import googleBooks from './GoogleBooksReducer';
import managedBook from './ManagedBookReducer';
import managedSubject from './ManagedSubjectReducer';
import notifications from './NotificationReducer';
import { routerReducer } from 'react-router-redux';
import settings from './SettingsReducer';
import subjects from './SubjectReducer';

const rootReducer = combineReducers({
  books,
  subjects,
  managedBook,
  managedSubject,
  settings,
  dialog: appModal,
  routing: routerReducer,
  googleBooks,
  ajaxGlobal,
  notifications,
  bookPreview
});

export default rootReducer;
