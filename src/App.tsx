import './App.css';
import InputKeyModal from './components/InputKeyModal'
import List from './components/List'
import InputBar from './components/InputBar'

function App() {
  return (
    <div className="App">
      <List />
      <InputBar />
      <InputKeyModal />
    </div>
  );
}

export default App;
