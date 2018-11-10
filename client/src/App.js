import React, { Component } from 'react';
import BookList from './Components/BookList';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

const client=new ApolloClient({
  uri : 'http://localhost:8080/graphql'
})
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <div className="App">
        <h1 className='main-heading'>Library</h1>
        <BookList/>
      </div>
      </ApolloProvider>
    );
  }
}

export default App;
