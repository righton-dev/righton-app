import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { colors, fonts } from '../../utils/theme'


export default function Circle(props) {
  return (
    <View style={[styles.circle, props.styles]}>
      <Text style={styles.message}>{props.message}</Text>
    </View>
  )
}

Circle.propTypes = {
  message: PropTypes.string,
  styles: PropTypes.shape({ type: PropTypes.string }),
}

Circle.defaultProps = {
  message: '',
  styles: {},
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    // width: 100, // Passed in via props
    // height: 100,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderRadius: 10000, // Defaults to half of width & height
    borderWidth: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
  },
  message: {
    color: colors.white,
    fontSize: fonts.xMedium,
    fontStyle: 'italic',
    textAlign: 'center',
    zIndex: 10,
  },
})
