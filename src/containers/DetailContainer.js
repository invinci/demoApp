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
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

const { height, width } = Dimensions.get("window");
class DetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {}

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <TouchableOpacity
          style={{
            flex: 0.1,
            alignItems: "flex-start",
            justifyContent: "center",
            marginLeft: height * 0.01,
            borderBottomWidth: 1,
            borderColor: "#dadada"
          }}
          onPress={() => Actions.pop()}
        >
          <Text>Back</Text>
        </TouchableOpacity>
        <View style={{ flex: 0.3 }}>
          <Image
            source={{ uri: this.props.data.picture }}
            resizeMode="contain"
            style={{ flex: 1 }}
          />
        </View>
        <View
          style={{
            flex: 0.1,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "#dadada"
          }}
        >
          <Text>{this.props.data.year}</Text>
        </View>
        <View style={{ flex: 0.5, padding: 40 }}>
          <Text>Reg. No : {this.props.data.regno}</Text>
          <Text>Category : {this.props.data.category}</Text>
          <Text>Price : ${this.props.data.priceperday}/ per day</Text>
          <Text>Doors : {this.props.data.doors}</Text>
          <Text>Transmission : {this.props.data.gear}</Text>
          <Text>Model : {this.props.data.model}</Text>
          <Text>Make : {this.props.data.make}</Text>
          <Text>Location : {this.props.data.location}</Text>
          <Text>Seats : {this.props.data.seats}</Text>
          <Text>
            Air Condition :{" "}
            {this.props.data.aircondition === true ? "Yes" : "No"}
          </Text>
        </View>
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
  return {};
}

export default connect(mapUser, {})(DetailContainer);
