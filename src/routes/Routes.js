import React, { Element } from "react";
import { Scene, Router, Modal, Reducer } from "react-native-router-flux";
import { StatusBar } from "react-native";
import LoginContainer from "../containers/LoginContainer";
import SignupContainer from "../containers/SignupContainer";
import ListContainer from "../containers/ListConatiner";
import DetailContainer from "../containers/DetailContainer";
class Routes extends React.Component {
  render(): Element<*> {
    return (
      <Router>
        <Scene key="root">
          <Scene key="login" hideNavBar component={LoginContainer} />
          <Scene key="signup" hideNavBar component={SignupContainer} />
          <Scene key="list" hideNavBar initial component={ListContainer} />
          <Scene key="detail" hideNavBar component={DetailContainer} />
        </Scene>
      </Router>
    );
  }
}
export default Routes;
