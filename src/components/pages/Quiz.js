import { useEffect, useReducer, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useQuestions from '../../hooks/useQuestions';
import Answers from '../Answers';
import ProgressBar from '../ProgressBar';
import { useAuth } from '../../contexts/AuthContext';
import { getDatabase, ref, set } from '@firebase/database';
import MiniPlayer from '../MiniPlayer';

const initialState = null;

function reducer(state, action) {
  switch (action.type) {
    case 'SET_QUESTIONS': {
      action.value.forEach(question => {
        question.options.forEach(option => {
          option.checked = false;
        });
      });

      return action.value;
    }

    case 'SET_ANSWERS': {
      const questions = state.slice(0);
      questions[action.questionId].options[action.optionIndex].checked =
        action.value;

      return questions;
    }

    default:
      return state;
  }
}

export default function Quiz() {
  const params = useParams();
  const history = useHistory();

  const { state } = history.location;

  const { loading, error, questions } = useQuestions(params.id);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [qsnAnsValue, dispatch] = useReducer(reducer, initialState);
  const { currentUser } = useAuth();

  useEffect(() => {
    dispatch({
      type: 'SET_QUESTIONS',
      value: questions,
    });
  }, [questions]);

  const handleAnswerChange = (e, index) => {
    dispatch({
      type: 'SET_ANSWERS',
      questionId: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  };

  function prevQuestionsPage() {
    if (currentQuestion >= 1 && currentQuestion <= questions.length) {
      setCurrentQuestion(prevCurrent => prevCurrent - 1);
    }
  }

  function nextQuestionsPage() {
    if (currentQuestion <= questions.length) {
      setCurrentQuestion(prevCurrent => prevCurrent + 1);
    }
  }

  const percentage =
    questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  async function submit() {
    const { uid } = currentUser;

    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);

    await set(resultRef, {
      [params.id]: qsnAnsValue,
    });

    history.push({
      pathname: `/result/${params.id}`,
      state: {
        qsnAnsValue,
      },
    });
  }

  return (
    <>
      {loading && <p>Loading.... </p>}
      {error && <p>There was an error</p>}

      {!loading && !error && qsnAnsValue?.length > 0 && (
        <>
          <h1>{qsnAnsValue[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>

          <Answers
            input
            handleChange={handleAnswerChange}
            options={qsnAnsValue[currentQuestion].options}
          />

          <ProgressBar
            prevBtn={prevQuestionsPage}
            nextBtn={nextQuestionsPage}
            progress={percentage}
            submit={submit}
          />
          <MiniPlayer title={state.videoTitle} videoId={params.id} />
        </>
      )}
    </>
  );
}
