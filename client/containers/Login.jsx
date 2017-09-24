import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';


class Login extends React.Component {
  /**
   * @constructor
   */
  constructor() {
    super();
    this.state = { msg: 'Want to log in?' };
  }

  /**
   * @returns {object} React element
   */
  render() {
    return (
      <div>
        {this.state.msg}
        <RaisedButton label="Log in!" onClick={this.props.logIn} />
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = dispatch => ({
  logIn: () => {
    dispatch({
      type: 'LOG_IN',
      payload: {
        name: 'Janek',
        email: 'human@fromhell.stuff',
      },
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
