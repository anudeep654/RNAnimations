import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native'
import TabBarData from '../Storage/DataSource'
import styles from './styles'
import PropTypes from 'prop-types'

export type TabStyle = {
  tabType: string
  tabbackgroundColor: string
  tabBarStyle: TabStyle[]
}

export type Props = {
  tabOrientation: string
  collapsingMenu: boolean
  tabBarStyles: object
  tabMetadataStyle: string
  collapsingStyle: string
}

export default class MfMenu extends Component<Props, State> {
  static defaultProps: {}

  public onTabClickhandler = (index: number) => {
    const { selectedIndex, xOffset, tabMovement } = this.state
    if (index > 2) {
      selectedIndex <= index
        ? this.scrollView.scrollTo({ x: xOffset + 150, animated: true })
        : this.scrollView.scrollTo({
            x: this.state.xOffset - 150,
            animated: true,
          })
    } else if (index <= 2) {
      selectedIndex <= index
        ? null
        : this.scrollView.scrollTo({
            x: this.state.xOffset - 120,
            animated: true,
          })
    }

    this.setState({
      selected: index,
      initialIndex: index,
      selectedIndex: index,
      tabMovement: this.state.tabMovement + 100,
    })
  }
  handleScroll = event => {
    let xOffset = event.nativeEvent.contentOffset.x
    this.setState({
      xOffset: xOffset,
    })
  }
  selectedStyleProps: any[] = []
  uselectedStyleProps: any[] = []
  configuringStylesFromProps = props => {
    const { tabBarStyles } = props
    const selectedTabProps = tabBarStyles.selectedTabStyles
    const unselectedTabProps = tabBarStyles.unselectedTabStyles
    switch (tabBarStyles.tabBarType) {
      case 'backgroundHighlightOnly':
        this.selectedStyleProps.length = 0
        this.uselectedStyleProps.length = 0
        this.selectedStyleProps = this.selectedStyleProps.concat({
          backgroundColor: selectedTabProps.tabbackgroundColor,
          borderColor: null,
          borderBottomWidth: 0,
          color: selectedTabProps.tabTextFontColor,
          fontSize: selectedTabProps.tabTextFontSize,
          fontWeight: selectedTabProps.tabTextFontWeight,
          fontFamily: selectedTabProps.tabFontFamily,
        })

        this.uselectedStyleProps = this.uselectedStyleProps.concat({
          backgroundColor: unselectedTabProps.tabbackgroundColor,
          borderColor: null,
          borderBottomWidth: 0,
          color: unselectedTabProps.tabTextFontColor,
          fontSize: unselectedTabProps.tabTextFontSize,
          fontWeight: unselectedTabProps.tabTextFontWeight,
          fontFamily: unselectedTabProps.tabFontFamily,
        })

        break
      case 'TextHighlightOnly':
        this.selectedStyleProps.length = 0
        this.uselectedStyleProps.length = 0
        this.selectedStyleProps = this.selectedStyleProps.concat({
          borderColor: null,
          borderBottomWidth: 0,
          color: selectedTabProps.tabTextFontColor,
          fontSize: selectedTabProps.tabTextFontSize,
          fontWeight: selectedTabProps.tabTextFontWeight,
          fontFamily: selectedTabProps.tabFontFamily,
        })
        this.uselectedStyleProps = this.uselectedStyleProps.concat({
          backgroundColor: unselectedTabProps.tabbackgroundColor,
          borderColor: null,
          borderBottomWidth: 0,
          color: unselectedTabProps.tabTextFontColor,
          fontSize: unselectedTabProps.tabTextFontSize,
          fontWeight: unselectedTabProps.tabTextFontWeight,
          fontFamily: unselectedTabProps.tabFontFamily,
        })

        break
      case 'TabBorderonly':
        ;(this.selectedStyleProps.length = 0),
          (this.uselectedStyleProps.length = 0)

        this.selectedStyleProps = this.selectedStyleProps.concat({
          borderColor: selectedTabProps.tabBorder,
          borderWidth: selectedTabProps.tabborderWidth,
          borderBottomWidth: selectedTabProps.tabborderWidth,
          color: selectedTabProps.tabTextFontColor,
          fontSize: selectedTabProps.tabTextFontSize,
          fontWeight: selectedTabProps.tabTextFontWeight,
          fontFamily: selectedTabProps.tabFontFamily,
        })
        this.uselectedStyleProps = this.uselectedStyleProps.concat({
          backgroundColor: unselectedTabProps.tabbackgroundColor,
          borderColor: null,
          borderBottomWidth: 0,
          color: unselectedTabProps.tabTextFontColor,
          fontSize: unselectedTabProps.tabTextFontSize,
          fontWeight: unselectedTabProps.tabTextFontWeight,
          fontFamily: unselectedTabProps.tabFontFamily,
        })

        break
      case 'UnderlineTabBarOnly':
        this.selectedStyleProps.length = 0
        this.uselectedStyleProps.length = 0
        this.selectedStyleProps = this.selectedStyleProps.concat({
          borderColor: selectedTabProps.tabBorder,
          borderBottomWidth: selectedTabProps.tabborderWidth,
          color: selectedTabProps.tabTextFontColor,
          fontSize: selectedTabProps.tabTextFontSize,
          fontWeight: selectedTabProps.tabTextFontWeight,
          fontFamily: selectedTabProps.tabFontFamily,
        })
        this.uselectedStyleProps = this.uselectedStyleProps.concat({
          backgroundColor: unselectedTabProps.tabbackgroundColor,
          borderColor: null,
          borderBottomWidth: 0,
          color: unselectedTabProps.tabTextFontColor,
          fontSize: unselectedTabProps.tabTextFontSize,
          fontWeight: unselectedTabProps.tabTextFontWeight,
          fontFamily: unselectedTabProps.tabFontFamily,
        })

        break
    }
  }

  public render() {
    const {
      scrollViewStyle,
      itemStyle,
      mainContainer,
      tabContainer,
      labelContainer,
      itemStyleWithoutBorder,
    } = styles
    const {
      tabOrientation,
      collapsingMenu,
      tabBarStyles,
      tabMetadataStyle,
      collapsingStyle,
    } = this.props
    this.configuringStylesFromProps(this.props)
    return (
      <View
        style={[
          mainContainer,
          { backgroundColor: tabBarStyles.tabBarbackgroundColor },
        ]}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={scrollViewStyle}
          ref={ref => {
            this.scrollView = ref
          }}
          onScroll={this.handleScroll}
        >
          {this.state.tabData.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => this.onTabClickhandler(index)}>
              <View key={index} style={labelContainer}>
                <Text
                  style={
                    (this.state.selected === index
                      ? [itemStyle, this.selectedStyleProps]
                      : [itemStyleWithoutBorder, this.uselectedStyleProps]) &&
                    (this.state.initialIndex === item.id
                      ? [itemStyle, this.selectedStyleProps]
                      : [itemStyleWithoutBorder, this.uselectedStyleProps])
                  }
                >
                  {item.tabName}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    )
  }

  public state = {
    selected: null,
    initialIndex: 0,
    currentIndex: null,
    selectedIndex: null,
    tabMovement: 0,
    xOffset: 0,
    yPos: 0,
    tabData: [
      {
        tabName: 'You',
        icon: 'https://img.icons8.com/ios/24/000000/user-filled.png',
        id: 0,
      },
      {
        tabName: 'Live TV',
        icon: 'https://img.icons8.com/ios/24/000000/retro-tv-filled.png',
        id: 1,
      },
      {
        tabName: 'On Demand',
        icon: 'https://img.icons8.com/android/24/000000/strike.png',
        id: 2,
      },
      {
        tabName: 'Recordings',
        icon: 'https://img.icons8.com/android/24/000000/micro.png',
        id: 3,
      },
      {
        tabName: 'Cogeco IsNew',
        icon: 'https://img.icons8.com/android/24/000000/micro.png',
        id: 4,
      },
      {
        tabName: 'HubSpike',
        icon: 'https://img.icons8.com/android/24/000000/hub.png',
        id: 5,
      },
      {
        tabName: 'Shortcuts Demo',
        icon: 'https://img.icons8.com/android/24/000000/megaphone.png',
        id: 6,
      },
      {
        tabName: 'Live Test',
        icon: 'https://img.icons8.com/android/24/000000/paper-plane.png',
        id: 7,
      },
      {
        tabName: 'DemoHub',
        icon: 'https://img.icons8.com/android/24/000000/paper-plane.png',
        id: 8,
      },
      {
        tabName: 'Anna_Epam',
        icon: 'https://img.icons8.com/android/24/000000/paper-plane.png',
        id: 9,
      },
      {
        tabName: 'Bell On Demand',
        icon: 'https://img.icons8.com/android/24/000000/paper-plane.png',
        id: 10,
      },
      {
        tabName: 'ARW Test',
        icon: 'https://img.icons8.com/android/24/000000/paper-plane.png',
        id: 11,
      },
    ],
  }
}
