import React from "react";
import { connect } from "react-redux";
import Login from "../components/Login";

class LoginContainer extends React.Component {
  componentDidMount() {}

  render() {
    return <Login />;
  }
}

function mapUser(state) {
  return { loginReducer: state.loginReducer };
}

export default connect(mapUser, {})(LoginContainer);
