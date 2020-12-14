export function handleExitGame(handleSetAppState, IOTUnsubscribeFromTopic, navigation) {
  IOTUnsubscribeFromTopic();
  navigation.navigate('Dashboard');
  // navigation.navigate('StudentFirst');
  handleSetAppState('gameState', {});
  handleSetAppState('GameRoomID', '');
  handleSetAppState('team', '');
}

export function hello() {
  console.log('hello world');
}
