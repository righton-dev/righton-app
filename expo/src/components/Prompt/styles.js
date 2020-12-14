import { ScaledSheet } from 'react-native-size-matters';

export default ScaledSheet.create({
  dialog: {
    flex: 1,
    alignItems: 'center'
  },
  dialogOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  dialogContent: {
    elevation: 5,
    marginTop: '150@vs',
    width: '300@s',
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    overflow: 'hidden'
  },
  dialogTitle: {
    borderBottomWidth: 1,
    paddingVertical: '10@vs',
    paddingHorizontal: '15@s'
  },
  dialogTitleText: {
    fontSize: '18@ms0.2',
    fontWeight: '600'
  },
  dialogBody: {
    paddingHorizontal: '10@s'
  },
  dialogInput: {
    height: '50@vs',
    fontSize: '18@ms0.2'
  },
  dialogFooter: {
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  dialogAction: {
    flex: 1,
    padding: '15@s'
  },
  dialogActionText: {
    fontSize: '18@ms0.2',
    textAlign: 'center',
    color: '#006dbf'
  }
});