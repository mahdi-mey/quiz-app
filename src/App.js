import Header from './components/Header'
import Main from './components/Main'
import Loader from './components/Loader'
import Error from './components/Error'
import StartScreen from './components/StartScreen'
import Question from './components/Question'
import NextButton from './components/NextButton'
import Progress from './components/Progress'
import FinishedScreen from './components/FinishedScreen'
import Footer from './components/Footer'
import Timer from './components/Timer'

import { useQuizContext } from "./contextes/QuizContext";

function App() {

  const {status} = useQuizContext()

  return (
    <div className="App">
      <Header></Header>
        <Main>
          {status === 'loading' && <Loader />}
          {status === 'error' && <Error />}
          {status === 'ready' && <StartScreen />}
          {status === 'active' &&
            <>
              <Progress />
              <Question />
              <Footer>
                <Timer />
                <NextButton />
              </Footer>
            </>
          }
          {
            status === 'finished' &&
            <FinishedScreen />
          }
        </Main>
    </div>
  );
}

export default App