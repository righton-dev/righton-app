import React from 'react'
import {
  Platform,
  Text,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import { ScaledSheet } from 'react-native-size-matters'
import { colors, fonts } from '../../../utils/theme'

export default function HeaderSimple({ team }) {
  return (
    <View style={[styles.container, Platform.OS === 'ios' ? styles.iosContainer : styles.androidContainer]}>
      <Text style={styles.team}>{team}</Text>
    </View>
  )
}

HeaderSimple.propTypes = {
  team: PropTypes.string,
}

HeaderSimple.defaultProps = {
  team: '',
}

const styles = ScaledSheet.create({
  androidContainer: {
    alignItems: 'center',
  },
  container: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: '15@s',
    height: '45@vs',
  },
  iosContainer: {
    alignItems: 'flex-end',
    paddingTop: '15@vs',
  },
  team: {
    color: colors.white,
    fontSize: fonts.xMedium,
  },
})
