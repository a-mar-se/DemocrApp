import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import ShowComments from '../poll/ShowComments.js';
import TimeAgo from '../poll/TimeAgo.js';
import ReactionBar from '../poll/ReactionBar.js';
import EditBar from '../poll/EditBar.js';
import Auth from '../auth.js';

const { REACT_APP_SERVER_URL } = process.env;
class Poll extends React.Component {
  state = {
    newComment: '',
    comments: [],
  };

  //  ({ name, email, id, poll, refreshPolls })

  refreshComments = async () => {
    const res = await fetch(
      `${REACT_APP_SERVER_URL}/comments-by-id/${this.props.poll._id}`,
    );
    const data = await res.json();
    this.setState({ comments: data });
  };

  componentDidMount() {
    this.refreshComments();
  }

  handleReactToPoll = async () => {
    if (Auth.isAuthenticated()) {
    } else {
      alert('You need to log in to react to polls');
    }
  };

  postNewComment = async (event) => {
    event.preventDefault();
    // console.log(this.state.comments);
    const response = await fetch(`${REACT_APP_SERVER_URL}/new-comment`, {
      method: 'POST',
      body: JSON.stringify({
        name: this.props.name,
        authorId: this.props.id,
        parentId: this.props.poll._id,
        content: this.state.newComment,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });

    if (response.status === 200) {
      console.log('New comment added!');
      // setNewComment('');
      this.setState({ newComment: '' });
      const commentBox = event.target;
      const com = commentBox.querySelector('#newComment');
      com.value = '';
      await this.refreshComments();
    } else {
      console.log('Error trying to post comment');
    }
  };

  handleChangeComment = (event) => {
    const { value } = event.currentTarget;

    this.setState({ newComment: value });
    // setNewComment(value);
  };

  handleComment = (event) => {
    if (Auth.isAuthenticated()) {
      this.handleChangeComment(event);
    } else {
      event.currentTarget.value = '';
      this.setState({ newComment: '' });
    }
  };

  render() {
    return (
      <div className="poll">
        <div>"{this.props.poll.title}"</div>
        <div className="titlePoll poll-section ">
          <div>
            <Link to={`/user/${this.props.poll.authorId}`}>
              {' '}
              {this.props.poll.name}
            </Link>{' '}
          </div>
          <div>👎 {this.props.poll.nagainst}</div>
          <div>👍 {this.props.poll.nfavor}</div>
          <TimeAgo createdAt={this.props.poll.createdAt} />
        </div>
        <div className="pollcontent"> {this.props.poll.content}</div>

        <ReactionBar
          poll={this.props.poll}
          id={this.props.poll._id}
          userId={this.props.id}
        />

        <div>
          <form className="writeComment" onSubmit={this.postNewComment}>
            <input
              id="newComment"
              type="text"
              placeholder="Write comment"
              value={this.state.newComment}
              onClick={this.handleReactToPoll}
              onChange={this.handleComment}
            />
            <button type="submit">Comment</button>
          </form>
        </div>
        <EditBar
          poll={this.props.poll}
          name={this.props.name}
          refreshPolls={this.props.refreshPolls}
        />

        <ShowComments
          refreshComments={this.refreshComments}
          comments={this.state.comments}
          idPoll={this.props.poll._id}
          name={this.props.name}
          email={this.props.email}
        />
      </div>
    );
  }
}
export default Poll;
