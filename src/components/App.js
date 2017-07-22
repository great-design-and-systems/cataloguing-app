import { ConnectAppModelPage } from '../containers/AppModalPage';
import { Header } from './common/';
import PropTypes from 'prop-types';
import React from 'react';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
  render() {
    return (
      <div>
        <ConnectAppModelPage />
        <Header {...this.props} />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
