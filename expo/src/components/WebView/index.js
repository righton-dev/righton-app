import React from 'react';
import {
  View,
  WebView,
} from 'react-native';
import PropTypes from 'prop-types';
import ButtonBack from '../ButtonBack';
import { ScaledSheet } from 'react-native-size-matters';
import { colors, elevation } from '../../utils/theme';

export default class ButtonWide extends React.PureComponent {
  static propTypes = {
    bodyStyles: PropTypes.shape({ type: PropTypes.any }),
    buttonStyles: PropTypes.shape({ type: PropTypes.any }),
    closeContainerStyles: PropTypes.shape({ type: PropTypes.any }),
    handleClose: PropTypes.func.isRequired,
    hyperlink: PropTypes.string.isRequired,
    iconStyles: PropTypes.shape({ type: PropTypes.any }),
  };
  
  static defaultProps = {
    bodyStyles: {},
    buttonStyles: {},
    closeContainerStyles: {},
    handleClose: () => {},
    hyperlink: '',
    iconStyles: {},
  };


  render() {
    const {
      bodyStyles,
      buttonStyles,
      closeContainerStyles,
      handleClose,
      hyperlink,
      iconStyles,
    } = this.props;

    return (
      <View style={[styles.container, bodyStyles]}>
        <View style={[styles.closeContainer, elevation, closeContainerStyles]}>
          <ButtonBack
            buttonStyles={buttonStyles}
            iconName={'close'}
            iconStyles={iconStyles}
            onPress={() => handleClose()}
          />
        </View>
        <WebView
          source={{ uri: hyperlink }}
          style={styles.webview}
        />
      </View>
    );
  }
}


const styles = ScaledSheet.create({
  closeContainer: {
    alignSelf: 'stretch',
    backgroundColor: colors.primary,
    height: '50@ms',
    justifyContent: 'center',
    paddingHorizontal: '15@ms',
    zIndex: 10,
  },
  container: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  webview: {
    flex: 1,
  },
});
