import React from "react";
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import { carList } from "../actions/ListAction";

const { height, width } = Dimensions.get("window");
class ListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.carList();
  }

  render() {
    if (this.props.carData && this.props.carData.cars) {
      console.log(this.props.carData.cars);
    }
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 0.15,
            backgroundColor: "dodgerblue",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              fontSize: height * 0.03,
              color: "white",
              fontWeight: "bold"
            }}
          >
            {" "}
            CARS{" "}
          </Text>
        </View>
        <ScrollView style={{ flex: 0.85 }}>
          {this.props.carData && this.props.carData.cars ? (
            this.props.carData.cars.map((item, index) => {
              return (
                <View
                  style={{
                    height: 100,
                    backgroundColor: "white",
                    flexDirection: "row",
                    padding: 10
                  }}
                  key={index}
                >
                  <View
                    style={{
                      flex: 0.4,
                      borderColor: "#dadada",
                      borderWidth: 1
                    }}
                  >
                    <Image
                      source={{ uri: item.picture }}
                      resizeMode="contain"
                      style={{ flex: 1, borderRadius: 50 }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 0.6,
                      borderColor: "#dadada",
                      borderWidth: 1,
                      alignItems: "flex-start",
                      justifyContent: "center",
                      paddingLeft: 10
                    }}
                  >
                    <Text>Make : {item.make}</Text>
                    <Text>Model : {item.model}</Text>
                    <Text>Year : {item.year}</Text>
                  </View>
                </View>
              );
            })
          ) : (
            <ActivityIndicator />
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

function mapUser(state) {
  return {
    carData: state.listReducer.listData
  };
}

export default connect(mapUser, { carList })(ListContainer);
