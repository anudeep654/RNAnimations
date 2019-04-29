/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import MfTabMenu from "./src/mfMenu";

const tabBarStyles = {
  tabBarType: "UnderlineTabBarOnly", // {backgroundHighlightOnly,TextHighlightOnly,TabBorderonly,UnderlineTabBarOnly}
  tabBarbackgroundColor: "#eee",
  selectedTabStyles: {
    tabbackgroundColor: "red",
    tabBorder: "green",
    tabborderWidth: 2,
    tabUnderlineColor: "red",
    tabTextFontWeight: "bold",
    tabTextFontSize: 20,
    tabTextFontColor: "red",
    tabFontFamily: "KohinoorBangla-Regular"
  },
  unselectedTabStyles: {
    tabbackgroundColor: null,
    tabTextFontWeight: "normal",
    tabTextFontSize: 20,
    tabTextFontColor: "black",
    tabFontFamily: "KohinoorBangla-Regular"
  }
};

export default class App extends Component {
  render() {
    const { container } = styles;
    return (
      <View style={container}>
        <MfTabMenu
          tabOrientation="horizontal" //{horizontal,vertical}
          collapsingMenu={true} //{true/false}
          tabBarStyles={tabBarStyles} //{change your styles above}
          tabMetadataStyle="TextIcon" //{IconText,TextUnderIcon,IconUnderText,TextOnly,IconOnly}
          collapsingItem="Text" //{Text or Icon which should collapse on scroll}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
