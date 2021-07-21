import { useState } from 'react';
import { ethers } from 'ethers';
import logo from './logo.svg';
import './App.css';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';

const greeterAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"

function App() {
  const [greeting, setGreeting] = useState('');

  async function requestAccount(){
    await window.ethereum.request({ method: 'eth_requestAccounts'});
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
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greeting)
      setGreeting('');
      await transaction.wait();
      fetchGreeting();
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchGreeting}>Greetings!!</button>
        <button onClick={setGreetingValue}>Set New Greeting</button>
        <input type="text" onChange={e => setGreeting(e.target.value)}
        placeholder="New Greeting text"
        value={greeting}/>
      </header>
    </div>
  );
}

export default App;
