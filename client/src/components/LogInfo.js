import React from 'react';

class LogInfo extends React.Component {
  render() {
    return (
      <div>
        {this.props.token !== '' ? (
          <div>
            Hello {this.props.email}, you are Logged in with token:{' '}
            {this.props.token}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
export default LogInfo;
