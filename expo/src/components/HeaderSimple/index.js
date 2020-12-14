import React from 'react'
import {
  Platform,
  Text,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import { ScaledSheet } from 'react-native-size-matters'
import { colors, fonts } from '../../utils/theme'

export default function HeaderSimple({ title }) {
  return (
    <View style={[styles.container, Platform.OS === 'ios' ? styles.iosContainer : styles.androidContainer]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>?</Text>
      </View>
    </View>
  )
}

HeaderSimple.propTypes = {
  title: PropTypes.string,
}

HeaderSimple.defaultProps = {
  title: 'RIGHT ON!',
}

const styles = ScaledSheet.create({
  androidContainer: {
    alignItems: 'center',
  },
  container: {
    alignSelf: 'stretch',
    backgroundColor: colors.black,
    flexDirection: 'row',
    justifyContent: 'center',
    height: '45@vs',
  },
  iosContainer: {
    alignItems: 'flex-end',
    paddingTop: '10@vs',
  },
  logo: {
    color: colors.white,
    fontSize: fonts.small,
  },
  logoContainer: {
    alignItems: 'center',
    borderColor: colors.white,
    borderWidth: 0.5,
    borderRadius: 100,
    height: '25@s',
    justifyContent: 'center',
    position: 'absolute',
    right: '15@s',
    width: '25@s',
  },
  title: {
    color: colors.white,
    fontSize: fonts.xMedium,
  },
})
