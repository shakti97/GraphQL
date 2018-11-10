import React, { Component } from 'react';
import {BookList} from './Components/BookList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className='main-heading'>Library</h1>
        <BookList/>
      </div>
    );
  }
}

export default App;
