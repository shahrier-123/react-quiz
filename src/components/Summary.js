import useFetch from '../hooks/useFetch';

export default function Summary({ score, noq }) {
  const getKeyWord = () => {
    if ((score / (noq * 5)) * 100 < 50) return 'failed';
    else if (score / (noq * 5) < 75) return 'good';
    else if (score / (noq * 5) < 100) return 'very good';
    else return 'excellent';

    // switch (scorePer) {
    //   case scorePer < 50:
    //     return 'failed';
    //   case scorePer < 75:
    //     return 'good';
    //   case scorePer < 100:
    //     return 'very good';
    //   default:
    //     return 'excellent';
    // }
  };

  const { loading, error, result } = useFetch(
    `https://api.pexels.com/v1/search?query=${getKeyWord()}&per_page=1`,
    { Authorization: process.env.REACT_APP_PEXELS_API_KEY }
  );

  const image = result ? result.photos[0].src.medium : '/images/success.png';

  return (
    <div className="summary">
      <div className="point">
        <p className="score">
          Your score is <br />
          {score} out of {noq * 5}
        </p>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>An error occured</p>}

      {!loading && !error && (
        <div className="badge">
          <img src={image} alt="Success" />
        </div>
      )}
    </div>
  );
}
