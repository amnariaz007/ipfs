import "./App.css";
import React, { useState } from "react";
const ipfsClient = require('ipfs-http-client');

const projectId = '2HJJkDwcnhBjlBdxSrnizHkePHu';
  const projectSecret = '95855fbce8d430480913d65714faf159';
  const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

  const ipfs = ipfsClient.create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth,
    },
  });

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ipfsHash: "",
      buffer: null,
    }
  }

  captureFile = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    this.setState({filei: file});
    console.log("File: " + file);
  };

  // onSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log("Submitting file");
  //   if (this.state.buffer == null) {
  //     alert("Please select a file");
  //   } else {
  //     const file = await ipfs.add(this.state.buffer);
  //     const hash = file[0].hash;
  //     console.log("hash: ", hash)
  //   }
  // };

  onSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting file");
    if (this.state.filei == null) {
      alert("Please select a file");
    } else {
      const file = await ipfs.add(this.state.filei);
      this.setState({path: file.path})
      console.log("path: ", file.path)
    }
  };

  render() {
    return (
      <div className="App">
        <input name="doc" type="file" onChange={this.captureFile} />
        <button onClick={this.onSubmit}>Update File</button>
      </div>
    );
  }
}

export default App;
