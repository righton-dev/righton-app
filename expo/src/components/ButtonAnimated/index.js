import React from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import Aicon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { ScaledSheet } from 'react-native-size-matters';
import { colors } from '../../utils/theme';

export default class ButtonAnimated extends React.Component {
  static propTypes = {
    buttonStyles: PropTypes.shape({}),
    icon: PropTypes.string,
    iconLabel: PropTypes.string,
    iconStyles: PropTypes.shape({}),
    onPress: PropTypes.func.isRequired,
  };
  
  static defaultProps = {
    buttonStyles: {},
    icon: '',
    iconLabel: '',
    iconStyles: {},
    onPress: () => {},
  };
  
  constructor() {
    super();
    this.opacity = new Animated.Value(0);
  }

  componentDidMount() {
    this.startAnimation(0.6);
  }


  startAnimation(x) {
    Animated.timing(
      this.opacity, {
        duration: 1200,
        toValue: x,
        useNativeDriver: true,
      }
    ).start(() => {
      if (x === 0.6) {
        this.startAnimation(0.1);
      } else {
        this.startAnimation(0.6);
      }
    });
  }

  render() {
    const {
      buttonStyles,
      icon,
      iconLabel,
      iconStyles,
      onPress,
    } = this.props;

    return (
      <View style={styles.container}>
        <Animated.View
          style={[{ opacity: this.opacity }, styles.animatedView, buttonStyles]}
        />
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={onPress}
          style={[styles.button, buttonStyles]}
        >
          {
            iconLabel ?
              <Text style={[styles.icon, iconStyles]}>{iconLabel}</Text>
              :
              <Aicon name={icon} style={[styles.icon, iconStyles]} />
          }
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  animatedView: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    height: '59@ms',
    position: 'absolute',
    width: '59@ms',
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 100,
    height: '45@ms',
    justifyContent: 'center',
    width: '45@ms',
  },
  container: {
    alignItems: 'center',
    bottom: '15@ms',
    justifyContent: 'center',
    position: 'absolute',
    right: '15@ms',
  },
  icon: {
    color: colors.white,
    fontSize: '20@ms0.2',
  }
});
