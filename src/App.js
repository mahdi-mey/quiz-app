import {useEffect} from 'react'
import './App.css';
import Header from './Header'
import Main from './Main'

function App() {
  useEffect(function(){
    fetch('http://localhost:8000/questions')
      .then(res => res.json())
        .then(data => console.log(data))
          .catch(err => console.error(err))
  })
  return (
    <div className="App">
      <Header></Header>
      <Main>
        <p>1/10</p>
        <p>Questions?</p>
      </Main>
    </div>
  );
}

export default App;