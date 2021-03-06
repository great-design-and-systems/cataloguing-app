import { FontAwesome, ResponsiveButton } from '../../../common/';
import {
  LABEL_AUTHOR,
  LABEL_EDITION,
  LABEL_LIBRARY_BOOKS,
  LABEL_PUBLISHER,
  LABEL_SUB_TITLE,
  LABEL_TITLE
} from '../../../../labels/';

import { Book } from '../../../../api/books/';
import PropTypes from 'prop-types';
import React from 'react';

export const LibraryBooks = ({ books, onRemove }) => {
  return (
    <div className="col-lg-6">
      <fieldset>
        <legend>{LABEL_LIBRARY_BOOKS}</legend>
        <table className="table table-hover table-condensed table-striped">
          <thead>
            <th />
            <th>{LABEL_TITLE}</th>
            <th>{LABEL_SUB_TITLE}</th>
            <th>{LABEL_EDITION}</th>
            <th>{LABEL_AUTHOR}</th>
            <th>{LABEL_PUBLISHER}</th>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book[Book.BOOK_ID]}>
                <td>
                  <ResponsiveButton onClick={() => { onRemove(book, index); }} className="btn btn-danger"
                    icon={<FontAwesome name="trash" size="lg" fixedWidth={true} />} />
                </td>
                <td>{book[Book.TITLE]}</td>
                <td>{book[Book.SUB_TITLE]}</td>
                <td>{book[Book.EDITION]}</td>
                <td>{book[Book.AUTHOR]}</td>
                <td>{book[Book.PUBLISHER]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </fieldset>
    </div>);
};

LibraryBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired
};
