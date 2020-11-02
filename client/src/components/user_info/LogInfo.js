import React from 'react';

class LogInfo extends React.Component {
  render() {
    return (
      <div>
        <div>Hello {this.props.name}</div>
        <div>Id {this.props.id}</div>
      </div>
    );
  }
}
export default LogInfo;
