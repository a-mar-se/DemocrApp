import React from 'react';

class LogInfo extends React.Component {
  // state = { { token: this.props.token, email: this.props.email } };

  // returnLogDetails() {
  //   if (this.state.token == '') {
  //     return <></>;
  //   } else {
  //     return (
  //       <div>
  //         Hello {this.props.token}, you are Logged in with token:{' '}
  //         {this.props.token}
  //       </div>
  //     );
  //   }
  // }
  render() {
    return (
      <div>
        {this.props.token != '' ? (
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
