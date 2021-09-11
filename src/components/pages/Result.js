import { useHistory, useParams } from 'react-router-dom';
import Analysis from '../Analysis';
import Summary from '../Summary';
import useAnswers from '../../hooks/useAnswers';
import _ from 'lodash';

export default function Result() {
  const { id } = useParams();
  const history = useHistory();
  const { qsnAnsValue } = history.location.state;

  const { loading, error, answers } = useAnswers(id);

  function calculateScore() {
    let score = 0;

    answers.forEach((question, index1) => {
      let correctIndexes = [],
        checkedIndexes = [];

      question.options.forEach((option, index2) => {
        if (option.correct) correctIndexes.push(index2);
        if (qsnAnsValue[index1].options[index2].checked) {
          checkedIndexes.push(index2);
          option.checked = true;
        }
      });

      if (_.isEqual(correctIndexes, checkedIndexes)) {
        score += 5;
      }
    });

    return score;
  }

  const userScore = calculateScore();

  console.log(userScore);
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>There was an error</p>}

      {answers && answers.length > 0 && (
        <>
          <Summary score={userScore} noq={answers.length} />
          <Analysis answers={answers} />
        </>
      )}
    </>
  );
}
