import { useState } from 'react';
import { ethers } from 'ethers';
import logo from './logo.svg';
import './App.css';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';

const greeterAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"

function App() {
  const [greeting, setGreeting] = useState();

  async function requestAccount(){
    await window.ethereum.requestAccount({ method: 'eth_requestAccounts'});
  }

  async function fetchGreeting(){
    if(typeof window.ethereum !== 'undefined'){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider);
      
      try{
        const data = await contract.greet();
        console.log("data: ", data);
      } catch (err){
        console.log("error: ", err);
      }
    }
  }

  async function setGreetingValue(){
    if(!greeting) return;
    if(typeof window.ethereum !== 'undefined'){
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = new provider.getSigner();
      const contract = new ethers.contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greeting)
      await transaction.wait();
      fetchGreeting();
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
