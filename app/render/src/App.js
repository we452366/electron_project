import logo from './logo.svg';
import './App.css';

let ipcRenderer = {};

// 抹平平台差异
if(window.require) {
  ipcRenderer = window.require('electron').ipcRenderer;
} else {
  ipcRenderer.send = (a,b) => console.log(a,b)
}

function App() {
  const startControl = () => {
    ipcRenderer.send('control', 1);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => startControl()}>登录</button>
      </header>
    </div>
  );
}

export default App;
