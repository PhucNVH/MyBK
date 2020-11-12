import 'react-native-gesture-handler';

import React from 'react';
import AppConnector from './Components/AppConnector/AppConnector';
import {AppContext} from './Context/AppContext';

export default class App extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      message: {
        status: false,
        title: '',
        content: '',
        type: 'error', // error, warning, success, info
        set: (status, title, content, type) =>
          this.setMessage(status, title, content, type),
      },

      loaded: false,
      login: false,
      csrf_token: '',
      setCsrfToken: val => this._isMounted && this.setState({csrf_token: val}),
      setLogin: (val, func) =>
        this._isMounted && this.setState({login: val}, func),
      setLoaded: (val, func) =>
        this._isMounted && this.setState({loaded: val}, func),
      set: (obj, func) => this._isMounted && this.setState(obj, func),
    };
  }

  setMessage = (status, title, content, type) => {
    const messageType = ['error', 'warning', 'success', 'info'];
    this._isMounted &&
      this.setState(state => {
        if (status) {
          state.message.status = true;
          state.message.title = title || '';
          state.message.content = content || '';
          type && messageType.includes(type) && (state.message.type = type);
          return state;
        }
        state.message.status = false;
        return state;
      });
  };

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <AppConnector />
      </AppContext.Provider>
    );
  }
  /*
   */
}
