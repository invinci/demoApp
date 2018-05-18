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
import { carList } from "../actions/ListAction";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Dropdown } from "react-native-material-dropdown";

const { height, width } = Dimensions.get("window");
class ListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      data: [
        {
          value: "Name"
        },
        {
          value: "Year"
        },
        {
          value: "Category"
        }
      ]
    };
  }

  componentWillMount() {
    this.props.carList();
  }

  render() {
    if (this.props.carData && this.props.carData.cars) {
      console.log(this.props.carData.cars);
    }
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            flex: 0.3,
            backgroundColor: "white"
          }}
        >
          <View
            style={{
              marginTop: height * 0.01,
              height: height * 0.1
            }}
          >
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="search"
              style={{
                borderWidth: 1,
                borderColor: "#dadada",
                margin: height * 0.01,
                marginHorizontal: height * 0.05,
                borderRadius: 20
              }}
              onChangeText={search => {
                this.setState({ search });
              }}
            />
          </View>
          <KeyboardAvoidingView
            style={{
              height: height * 0.1,
              flexDirection: "row"
            }}
          >
            <View
              style={{
                flex: 0.5,
                alignItems: "center"
              }}
            >
              <Dropdown
                containerStyle={{ width: height * 0.15 }}
                label="Sort By"
                data={this.state.data}
              />
            </View>
            <View
              style={{
                flex: 0.5,
                alignItems: "center"
              }}
            >
              <Dropdown
                label="Filter"
                containerStyle={{ width: height * 0.18 }}
                data={this.state.data}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
        <ScrollView style={{ flex: 0.7 }}>
          {this.props.carData && this.props.carData.cars ? (
            this.props.carData.cars.map((item, index) => {
              return (
                <TouchableOpacity
                  style={{
                    backgroundColor: "white",
                    flexDirection: "row",
                    padding: 5
                  }}
                  key={index}
                  onPress={() => {
                    Actions.detail({ data: item });
                  }}
                >
                  <View
                    style={{
                      flex: 0.3,
                      borderColor: "#dadada",
                      borderWidth: 1
                    }}
                  >
                    <View style={{ flex: 0.8 }}>
                      <Image
                        source={{ uri: item.picture }}
                        resizeMode="contain"
                        style={{ flex: 1 }}
                      />
                    </View>
                    <View style={{ flex: 0.2, alignItems: "center" }}>
                      <Text>{item.year}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 0.7,
                      borderColor: "#dadada",
                      borderWidth: 1,
                      flexDirection: "row"
                    }}
                  >
                    <View
                      style={{
                        flex: 0.5,
                        alignItems: "flex-start",
                        justifyContent: "center",
                        paddingLeft: 5
                      }}
                    >
                      <Text>Reg. No : {item.regno}</Text>
                      <Text>Category : {item.category}</Text>
                      <Text>Price : ${item.priceperday}/ per day</Text>
                    </View>
                    <View
                      style={{
                        flex: 0.5,
                        alignItems: "flex-start",
                        justifyContent: "center"
                      }}
                    >
                      <Text>Model : {item.model}</Text>
                      <Text>Make : {item.make}</Text>
                      <Text>Location : {item.location}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
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
