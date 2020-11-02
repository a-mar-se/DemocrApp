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
  const handleAgainst = () => {
    handleReactToPoll();
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

  const likePoll = async (event) => {
    event.preventDefault();

    const response = await fetch(`/poll/like/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        nfavor: nfavorPast + 1,
        favor: [userId, ...favorPast],
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response);

    if (response.status === 200) {
      alert('Poll sucessfully edited!');
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
