import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import Svg, { Polygon } from 'react-native-svg';

export default function Triangle(props) {
  return (
    <View style={[styles.position, props.position]}>
      <Svg height={props.height} width={props.width}>
        <Polygon
          points={props.points}
          fill={'none'}
          stroke={'#fff'}
          strokeWidth={0.5}
        />
      </Svg>
    </View>
  );
}

Triangle.propTypes = {
  height: PropTypes.number,
  points: PropTypes.string,
  position: PropTypes.number,
  width: PropTypes.number,
};

Triangle.defaultProps = {
  height: 0,
  points: '',
  position: 0,
  width: 0,
};

const styles = StyleSheet.create({
  position: {
    alignItems: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    zIndex: 2,
  },
});
