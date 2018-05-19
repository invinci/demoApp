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
  TouchableOpacity,
  Keyboard,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import {
  carList,
  searchCar,
  updateSortCheck,
  updateFilterCheck
} from "../actions/ListAction";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Dropdown } from "react-native-material-dropdown";

const { height, width } = Dimensions.get("window");
class ListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      sortValue: "",
      filterValue: "",
      filterdata: [
        {
          value: "Name"
        },
        {
          value: "Company"
        },
        {
          value: "Make"
        },
        {
          value: "Priceperday"
        },
        { value: "Year" }
      ],
      sortVal: [
        {
          value: "Ascending"
        },
        {
          value: "Descending"
        }
      ]
    };
  }

  componentWillMount() {
    this.props.carList();
  }

  onChangeSort = val => {
    this.refs.input.blur();
    this.setState({ sortValue: val });
    this.props.updateSortCheck(val);
  };
  onChangeFilter = val => {
    this.refs.input.blur();
    this.setState({ filterValue: val });
    this.props.updateFilterCheck(val);
  };

  render() {
    if (this.props.carData && this.props.carData.cars) {
      console.log(this.props.carData.cars);
    }
    return (
      <View
        style={{ flex: 1, backgroundColor: "white" }}
        keyboardShouldPersistTaps={"always"}
      >
        <View
          style={{
            flex: 0.25,
            backgroundColor: "white",
            marginTop: 10,
            marginBottom: 10
          }}
        >
          <View
            style={{
              marginTop: height * 0.01,
              height: height * 0.09,
              paddingTop: 10
            }}
          >
            <TextInput
              ref="input"
              underlineColorAndroid="transparent"
              placeholder="Search"
              style={{
                borderWidth: 1,
                borderColor: "#dadada",
                margin: 10,
                marginHorizontal: height * 0.05,
                height: Platform.OS === "ios" ? height * 0.05 : height * 0.06,
                borderRadius: 20,
                padding: 5,
                paddingLeft: 10
              }}
              autoFocus={false}
              clearButtonMode={"while-editing"}
              clearTextOnFocus
              onBlur={Keyboard.dismiss}
              onChangeText={search => {
                this.setState({ search });
                setTimeout(() => this.props.searchCar(search), 1000);
              }}
            />
          </View>
          <KeyboardAvoidingView
            style={{
              height: height * 0.1,
              flexDirection: "row",
              backgroundColor: "white",
              borderBottomColor: "#dadada",
              borderBottomWidth: 1
            }}
          >
            <View
              style={{
                flex: 0.5,
                alignItems: "center"
              }}
            >
              <Dropdown
                containerStyle={{ width: height * 0.17 }}
                label="Filter By"
                data={this.state.filterdata}
                value={this.state.filterValue}
                onChangeText={this.onChangeFilter}
              />
            </View>
            <View
              style={{
                flex: 0.5,
                alignItems: "center"
              }}
            >
              <Dropdown
                label="Sort By"
                value={this.state.sortValue}
                containerStyle={{ width: height * 0.18 }}
                data={this.state.sortVal}
                onChangeText={this.onChangeSort}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
        <ScrollView style={{ flex: 0.7 }}>
          {!this.props.isLoading && this.props.listData ? (
            this.props.listData.map((item, index) => {
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
    listData: state.listReducer.listData
  };
}

export default connect(mapUser, {
  carList,
  searchCar,
  updateSortCheck,
  updateFilterCheck
})(ListContainer);
