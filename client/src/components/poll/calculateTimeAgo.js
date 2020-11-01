const calculateTimeAgo = (creationTime) => {
  const timeNow = new Date();
  const cDate = new Date(creationTime);
  const calcTime = timeNow.getTime() - cDate.getTime();
  // console.log(calcTime);

  const daysAgo = Math.floor(calcTime / (24 * 60 * 60 * 1000));
  const hoursAgo = Math.floor(calcTime / (60 * 60 * 1000));
  const minutesAgo = Math.floor(calcTime / (60 * 1000));
  const secondsAgo = Math.floor(calcTime / 1000);
  let text = '';
  if (daysAgo > 30) {
    text = text + `, ${creationTime.slice(0, 10)}`;
  } else {
    if (daysAgo > 0) {
      text = `${daysAgo} days ago`;
    } else {
      if (hoursAgo > 0) {
        text = `${hoursAgo} hours ago`;
      } else {
        if (minutesAgo > 0) {
          text = `${minutesAgo} minutes ago`;
        } else {
          text = `${secondsAgo} seconds ago`;
        }
      }
    }
  }
  return text;
};

export default calculateTimeAgo;
