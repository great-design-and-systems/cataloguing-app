import { IndexRoute, Route } from 'react-router';

import App from './components/App';
import { ConnectBookPage } from './containers/BooksPage';
import { ConnectedManageBookPage } from './containers/ManageBookPage';
import { ConnectedManagedSubjectPage } from './containers/ManagedSubjectPage';
import NotFoundPage from './components/NotFoundPage';
import React from 'react';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ConnectBookPage} />
    <Route path="books" component={ConnectBookPage} />
    <Route path="books/new" component={ConnectedManageBookPage} />
    <Route path="books/:id" component={ConnectedManageBookPage} />
    <Route path="books/subjects/:index" component={ConnectedManagedSubjectPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
