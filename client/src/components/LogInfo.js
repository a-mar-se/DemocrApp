import React from 'react';

class LogInfo extends React.Component {
  render() {
    return (
      <div>
        {this.props.token !== '' ? (
          <div>
            Hello {this.props.email}, with email: {this.props.name}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
export default LogInfo;
