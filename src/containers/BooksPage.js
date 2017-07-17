import * as actions from '../actions/BookActions';

import { BookTable } from '../components/books/BookTable';
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export class BooksPage extends React.Component {
    componentDidMount() {
        this.props.actions.loadBooks();
    }
    render() {
        return (<div className="books page">
            <BookTable searchBooks={this.props.actions.searchBooks} books={this.props.books} />
        </div>);
    }
}

BooksPage.propTypes = {
    actions: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        books: state.books
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export const ConnectBookPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(BooksPage);
