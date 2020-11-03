import Auth from '../auth.js';

const { REACT_APP_SERVER_URL } = process.env;
const ReactionBar = ({
  parentId,
  userId,
  content,
  nfavorPast,
  favorPast,
  againstPast,
  nagainstPast,
  name,
  token,
  createdAt,
  id,
}) => {
  const handleAgainst = (event) => {
    handleReactToPoll();
    dislikePoll(event);
  };
  const handleFavor = (event) => {
    handleReactToPoll();
    likePoll(event);
  };

  const handleReactToPoll = async () => {
    if (token !== '') {
    } else {
      alert('You need to log in to react to polls');
    }
  };

  const dislikePoll = async (event) => {
    event.preventDefault();

    const response = await fetch(`${REACT_APP_SERVER_URL}/poll/dislike/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        userId: userId,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });

    console.log(response);

    if (response.status === 200) {
      console.log('Poll sucessfully edited!');
    } else {
      console.log('Error trying to edit poll');
    }
  };
  const likePoll = async (event) => {
    event.preventDefault();

    const response = await fetch(`${REACT_APP_SERVER_URL}/poll/like/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        userId: userId,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });

    console.log(response);

    if (response.status === 200) {
      console.log('Poll sucessfully edited!');
    } else {
      console.log('Error trying to edit poll');
    }
  };

  return (
    <div className="reaction-bar">
      <button onClick={handleAgainst}>Against Poll</button>
      {/* <input type="range" /> */}
      <button onClick={handleFavor}>Agree with Poll</button>
    </div>
  );
};
export default ReactionBar;
