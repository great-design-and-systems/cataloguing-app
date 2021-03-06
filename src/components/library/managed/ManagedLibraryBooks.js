import * as bookActions from '../../../actions/BookActions';
import * as libraryActions from '../../../actions/LibraryActions';

import { Book } from '../../../api/books/';
import { DatabaseBooks } from './books/DatabaseBooks';
import { Library } from '../../../api/library/';
import { LibraryBooks } from './books/LibraryBooks';
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export class ManagedLibraryBooks extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {};
    this.thisOnAddBook = this.onAddBook.bind(this);
    this.thisOnRemoveBook = this.onRemoveBook.bind(this);
  }

  componentWillMount() {
    bookActions.loadBooks();
    this.setState({
      libraryBooks: []
    });
  }

  onRemoveBook(book, index) {
    const libraryBooks = [...this.state.libraryBooks];
    libraryBooks.splice(index, 1);
    this.setState({ libraryBooks });
    this.props.libraryActions.setManagedLibraryFieldValue(Library.BOOKS, libraryBooks);
  }

  onAddBook(book) {
    if (!this.state.libraryBooks.filter(curBook => curBook[Book.BOOK_ID] === book[Book.BOOK_ID]).length) {
      const libraryBooks = [...this.state.libraryBooks, book];
      this.setState({ libraryBooks });
      this.props.libraryActions.setManagedLibraryFieldValue(Library.BOOKS, libraryBooks);
    }
  }

  render() {
    return (<div className="container-fluid col-lg-12">
      <LibraryBooks books={this.state.libraryBooks} onRemove={this.thisOnRemoveBook} />
      <DatabaseBooks bookActions={this.props.bookActions} onAdd={this.thisOnAddBook} books={this.props.books} />
    </div>);
  }
}
function mapDispatchToProps(dispatch) {
  return {
    bookActions: bindActionCreators(bookActions, dispatch),
    libraryActions: bindActionCreators(libraryActions, dispatch)
  };
}
function mapStateToProps(state) {
  return {
    books: state.books,
    ajax: state.ajaxGlobal
  };
}
ManagedLibraryBooks.propTypes = {
  books: PropTypes.array,
  ajax: PropTypes.object.isRequired,
  libraryActions: PropTypes.object.isRequired,
  bookActions: PropTypes.object.isRequired
};
export const ConnectedManagedLibraryBooks = connect(mapStateToProps, mapDispatchToProps)(ManagedLibraryBooks);
