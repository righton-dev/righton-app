import PropTypes from 'prop-types';

export const navigationPropTypes = PropTypes.shape({
  navigate: PropTypes.func,
  state: PropTypes.shape({
    params: PropTypes.shape({}),
  }),
});

export const navigationDefaultProps = {
  navigate: () => {},
  state: {
    params: {},
  },
};

export const gameStatePropTypes = PropTypes.shape({
  GameID: PropTypes.string,
  GameRoomID: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  grade: PropTypes.string,
  domain: PropTypes.string,
  cluster: PropTypes.string,
  standard: PropTypes.string,
  team0: PropTypes.shape({
    answer: PropTypes.string,
    choices: PropTypes.arrayOf(
      PropTypes.shape({
        correct: PropTypes.bool,
        value: PropTypes.string,
        votes: PropTypes.number,
      })
    ),
    image: PropTypes.string,
    instructions: PropTypes.arrayOf(PropTypes.string),
    question: PropTypes.string,
    uid: PropTypes.string,
    tricks: PropTypes.arrayOf(
      PropTypes.shape({
        selected: PropTypes.bool,
        value: PropTypes.string,
      })
    ),
    points: PropTypes.number,
  }),
  state: PropTypes.shape({
    teamRef: PropTypes.string,
  }),
  quizTime: PropTypes.string,
  trickTime: PropTypes.string,
});

export const gameStateDefaultProps = {
  GameID: `${Math.random()}`,
  GameRoomID: '',
  title: '',
  description: '',
  grade: '',
  domain: '',
  cluster: '',
  standard: '',
  team0: {
    answer: '',
    choices: [
      {
        correct: false,
        value: '',
        votes: 0,
      }
    ],
    image: '',
    instructions: [],
    question: '',
    uid: '',
    tricks: [{
      selected: false,
      value: '',
    }],
    points: 0,
  },
  state: {
    teamRef: '',
  },
  quizTime: '1:00',
  trickTime: '3:00',
};

export const screenPropsPropTypes = PropTypes.shape({
  account: PropTypes.shape({
    /*
     * Teacher unique account props.
     */
    TeacherID: PropTypes.string,
    gamesCreated: PropTypes.number,
    gamesPlayed: PropTypes.number,
    schoolID: PropTypes.number,
    games: PropTypes.arrayOf(PropTypes.shape({})),
    history: PropTypes.arrayOf(PropTypes.shape({})),
    sharedGames: PropTypes.arrayOf(PropTypes.shape({})),
    gamesRef: PropTypes.shape({
      local: PropTypes.number,
      db: PropTypes.number,
    }),
    historyRef: PropTypes.shape({
      local: PropTypes.number,
      db: PropTypes.number,
    }),
    /*
     * Student unique account props.
     */
    StudentID: PropTypes.string,
    // gamesPlayed: PropTypes.number,
    playersTricked: PropTypes.number,
    tricksSuggested: PropTypes.number,
    points: PropTypes.number,
  }),
  deviceSettings: PropTypes.shape({
    quizTime: PropTypes.string,
    trickTime: PropTypes.string,
    role: PropTypes.string,
    ID: PropTypes.string, // Student unique ID
  }),
  GameRoomID: PropTypes.string,
  gameState: gameStatePropTypes,
  players: PropTypes.shape({}),
  points: PropTypes.number,
  session: PropTypes.shape({}),
  team: PropTypes.string,
  handleSetAppState: PropTypes.func,
  auth: PropTypes.shape({}),
  doSignOut: PropTypes.func,
  IOTPublishMessage: PropTypes.func,
  IOTSubscribeToTopic: PropTypes.func,
  IOTUnsubscribeFromTopic: PropTypes.func,
  navigation: navigationPropTypes,
});

export const screenPropsDefaultProps = {
  account: PropTypes.shape({
    /*
     * Teacher unique account props.
     */
    TeacherID: '',
    gamesCreated: 0,
    gamesPlayed: 0,
    schoolID: 0,
    games: [],
    history: [],
    sharedGames: [],
    gamesRef: {
      local: 0,
      db: 0,
    },
    historyRef: {
      local: 0,
      db: 0,
    },
    /*
     * Student unique account props.
     */
    StudentID: '',
    // gamesPlayed: 0,
    playersTricked: 0,
    tricksSuggested: 0,
    points: 0,
  }),
  deviceSettings: {
    quizTime: '',
    trickTime: '',
    role: '',
    ID: `${Math.random()}`, // Student unique ID
  },
  GameRoomID: '',
  gameState: gameStateDefaultProps,
  players: {},
  points: 0,
  session: {},
  team: '',
  handleSetAppState: () => {},
  auth: {},
  doSignOut: () => {},
  IOTPublishMessage: () => {},
  IOTSubscribeToTopic: () => {},
  IOTUnsubscribeFromTopic: () => {},
  navigation: navigationDefaultProps,
};

export const gamePropTypes = PropTypes.shape({
  GameID: PropTypes.string,
  // banner: PropTypes.string,
  grade: PropTypes.string,
  domain: PropTypes.string,
  cluster: PropTypes.string,
  standard: PropTypes.string,
  description: PropTypes.string,
  favorite: PropTypes.boolean,
  questions: PropTypes.arrayOf(PropTypes.shape({
    answer: PropTypes.string,
    image: PropTypes.string,
    instructions: PropTypes.arrayOf(PropTypes.string),
    question: PropTypes.string,
    uid: PropTypes.string,
  })),
  quizmaker: PropTypes.bool,
  title: PropTypes.string,
});

export const gameDefaultProps = {
  GameID: '',
  // banner: '',
  grade: '',
  domain: '',
  cluster: '',
  standard: '',
  description: '',
  favorite: false,
  questions: [{
    answer: '',
    image: '',
    instructions: [],
    question: '',
    uid: `${Math.random()}`,
  }],
  quizmaker: false,
  title: '',
};
