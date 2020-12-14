import React from 'react';
// import Amplify, { Auth } from 'aws-amplify';
// import awsconfig from './src/aws-exports';

// this imports the code for the app, starting at the navaigation
import RootNavigator from './src/Navigator';

// this sets up the API
// Amplify.configure(awsconfig)

// this is your "App" component, which for now is really just the navigator
function App() {
  return <RootNavigator />;
}

export default App;
