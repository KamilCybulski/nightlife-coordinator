import React from 'react';


class Login extends React.Component {
  /**
   * @constructor
   */
  constructor() {
    super();
    this.state = { msg: '' };
  }

  /**
   * @returns {object} React element
   */
  render() {
    return (
      <div>
        {this.state.msg}
      </div>
    );
  }
}

export default Login;
