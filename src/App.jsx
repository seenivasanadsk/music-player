import './App.css';
import React, { Component, useCallback } from 'react'
import ImportSong from './Components/ImportSong';
import Get from './Components/Get'
var jsmediatags = window.jsmediatags;

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  filehandle = e => {
  }

  afterImport = e => {
    this.setState({
      showImport: false
    })
  }

  render() {
    return (
      <div className='App'>
        {this.state.showImport && <ImportSong afterImport={this.afterImport}/>}
        <Get />
        <button onClick={() => this.setState({ showImport: true })}>Import</button>
      </div>
    )
  }
}

export default App;