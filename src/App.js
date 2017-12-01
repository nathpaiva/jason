import React, { Component } from 'react';
import Form from './Form'
import request from './services/request'

class App extends Component {
  state = {
    data: ''
  }

  componentDidMount() {
    request().then(data => this.setState({ data: data._embedded }));
  }

  render() {
    return (!!this.state.data ? <Form data={this.state.data} />  : '' );
  }
}

export default App;
