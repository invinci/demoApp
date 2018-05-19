import React, { Element } from "react";
import { Scene, Router, Modal, Reducer } from "react-native-router-flux";
import { StatusBar } from "react-native";
import ListContainer from "../containers/ListContainer";
import DetailContainer from "../containers/DetailContainer";
class Routes extends React.Component {
  render(): Element<*> {
    return (
      <Router>
        <Scene key="root">
          <Scene key="list" hideNavBar initial component={ListContainer} />
          <Scene key="detail" hideNavBar component={DetailContainer} />
        </Scene>
      </Router>
    );
  }
}
export default Routes;
