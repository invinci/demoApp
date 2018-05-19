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
import Picker from "react-native-roll-picker";
import RNPickerSelect from "./../vendors/react-native-picker-select";

const { height, width } = Dimensions.get("window");

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 4,
    color: "white"
  },
  inputAndroid: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 4,
    color: "white"
  }
});
class ListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      sortValue: "",
      filterValue: "",
      open: false,
      filterdata: [
        {
          label: "Name",
          value: "Name"
        },
        {
          label: "Company",
          value: "Company"
        },
        {
          label: "Priceperday",
          value: "Priceperday"
        },
        {
          label: "Year",
          value: "Year"
        }
      ],
      sortVal: [
        {
          label: "Ascending",
          value: "Ascending"
        },
        {
          label: "Descending",
          value: "Descending"
        }
      ]
    };
  }

  componentWillMount() {
    this.props.carList();
  }

  onChangeSort = val => {
    if (val) {
      this.props.updateSortCheck(val);
    }
    this.refs.input.blur();
    this.setState({ sortValue: val });
  };
  onChangeFilter = val => {
    if (val) {
      this.props.updateFilterCheck(val);
    }
    this.refs.input.blur();
    this.setState({ filterValue: val });
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            flex: 0.2,
            backgroundColor: "#1e90ff"
          }}
        >
          <View
            style={
              this.state.open
                ? {
                    height: height * 0.1,
                    paddingTop: 10
                  }
                : {
                    flex: 0.5,
                    paddingTop: 10
                  }
            }
          >
            <TextInput
              ref="input"
              underlineColorAndroid="transparent"
              placeholder="Search"
              placeholderTextColor={"white"}
              style={{
                borderWidth: 1,
                borderColor: "#dadada",
                margin: 10,
                marginHorizontal: height * 0.05,
                height: Platform.OS === "ios" ? height * 0.05 : height * 0.06,
                borderRadius: 20,
                padding: 5,
                paddingLeft: 10,
                color: "white"
              }}
              autoFocus={false}
              clearButtonMode={"while-editing"}
              clearTextOnFocus
              onBlur={Keyboard.dismiss}
              onChangeText={search => {
                this.setState({ search });
                setTimeout(() => this.props.searchCar(search), 0);
              }}
              onFocus={() => this.setState({ open: true })}
              onBlur={() => this.setState({ open: false })}
            />
          </View>
          <KeyboardAvoidingView
            style={{
              flex: 0.5,
              flexDirection: "row",
              backgroundColor: "#1e90ff",
              marginBottom: 5
            }}
          >
            <View
              style={{
                flex: 0.5,
                alignItems: "center",
                paddingHorizontal: 30
              }}
            >
              <RNPickerSelect
                placeholder={{
                  label: "FilterBy",
                  value: null
                }}
                items={this.state.filterdata}
                onValueChange={this.onChangeFilter}
                onUpArrow={() => {
                  this.inputRefs.name.focus();
                }}
                onDownArrow={() => {
                  this.inputRefs.picker2.togglePicker();
                }}
                style={{ ...pickerSelectStyles }}
                value={this.state.filterValue}
              />
            </View>
            <View
              style={{
                flex: 0.5,
                alignItems: "center",
                paddingHorizontal: 30
              }}
            >
              <RNPickerSelect
                placeholder={{
                  label: "SortBy",
                  value: null
                }}
                items={this.state.sortVal}
                onValueChange={this.onChangeSort}
                onUpArrow={() => {
                  this.inputRefs.name.focus();
                }}
                onDownArrow={() => {
                  this.inputRefs.picker2.togglePicker();
                }}
                style={{ ...pickerSelectStyles }}
                value={this.state.sortValue}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
        <View style={{ flex: 0.75, backgroundColor: "white" }}>
          <ScrollView>
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
