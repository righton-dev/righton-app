import React from 'react'
import {
  Modal,
  ScrollView,
  Text,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import { ScaledSheet } from 'react-native-size-matters'
import Touchable from 'react-native-platform-touchable'
import { colors, fonts } from '../../utils/theme'


export default class SelectionModal extends React.PureComponent {
  renderOneTouchableItem = (item, onSelect) => {
    if (item.value === 'section') {
      return (
        <View key={item.label} style={[styles.itemContainer, styles.center]}>
          <Text style={styles.section}>{item.label}</Text>
        </View>
      )
    }
    return (
      <Touchable
        key={item.value}
        onPress={() => onSelect(item.value)}
      >
        <View style={[styles.itemContainer, styles.center]}>
          <Text style={styles.item}>{item.label}</Text>
        </View>
      </Touchable>
    )
  }


  renderTwoTouchableItems = (item, onSelect) => (
    <Touchable
      key={item.value}
      onPress={() => onSelect(item.value)}
    >
      <View style={styles.itemContainer}>
        <Text style={styles.item}>{item.label}</Text>
        <Text style={styles.item}>{item.label_2}</Text>
      </View>
    </Touchable>
  );


  renderThreeTouchableItems = (item, onSelect) => (
    <Touchable
      key={item.value}
      onPress={() => onSelect(item.value)}
    >
      <View style={styles.itemContainer}>
        <Text style={[styles.item, styles.flexOne]}>{item.label}</Text>
        <Text style={[styles.item, styles.flexTwo]}>{item.label_2}</Text>
        <Text style={[styles.item, styles.flexThree]}>{item.label_3}</Text>
      </View>
    </Touchable>
  );


  render() {
    const {
      items,
      handleClose,
      onSelect,
      title,
      visible
    } = this.props

    const numberOfLabels = items.length && Object.keys(items[0]).length - 1

    return (
      <Modal
        animationType={'slide'}
        onRequestClose={handleClose}
        transparent
        visible={visible}
        style={styles.modalContainer}
      >
        <Touchable
          onPress={handleClose}
          style={styles.closeContainer}
        >
          <View />
        </Touchable>
        <View style={styles.selectionContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <ScrollView style={styles.scrollview}>
            {
              numberOfLabels === 1 &&
              items.map(item => this.renderOneTouchableItem(item, onSelect))
            }
            {
              numberOfLabels === 2 &&
              items.map(item => this.renderTwoTouchableItems(item, onSelect))
            }
            {
              numberOfLabels === 3 &&
              items.map(item => this.renderThreeTouchableItems(item, onSelect))
            }
          </ScrollView>
        </View>
      </Modal>
    )
  }
}

SelectionModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  onSelect: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
}

SelectionModal.defaultProps = {
  handleClose: () => { },
  items: [],
  onSelect: () => { },
  title: '',
  visible: false,
}

const styles = ScaledSheet.create({
  center: {
    justifyContent: 'center',
  },
  closeContainer: {
    flex: 0.5,
    height: '150@vs',
  },
  flexOne: {
    flex: 0.1,
  },
  flexTwo: {
    flex: 0.8,
  },
  flexThree: {
    flex: 0.1,
  },
  item: {
    color: colors.dark,
    fontSize: fonts.xMedium,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '15@s',
    paddingVertical: '15@vs',
  },
  modalContainer: {
    flex: 1,
  },
  section: {
    fontSize: fonts.xMedium,
    fontWeight: 'bold',
  },
  selectionContainer: {
    backgroundColor: colors.white,
    flex: 0.5,
  },
  scrollview: {
    flexGrow: 1,
    paddingBottom: '25@vs',
    paddingTop: '15@vs',
  },
  title: {
    color: colors.white,
    fontSize: fonts.xMedium,
    fontWeight: 'bold',
  },
  titleContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: colors.primary,
    borderBottomWidth: 1,
    borderColor: colors.dark,
    justifyContent: 'center',
    paddingVertical: '15@vs',
  },
})
