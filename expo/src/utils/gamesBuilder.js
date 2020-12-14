import {
  generateUniqueGameRoomIDInDynamoDB,
  putGameToDynamoDB,
} from '../../lib/Categories/DynamoDB/TeacherGameRoomAPI';

import {
  // getItemFromTeacherAccountFromDynamoDB,
  updateTeacherGamesInTeacherAccountInDynamoDB,
} from '../../lib/Categories/DynamoDB/TeacherAccountsAPI';

import LocalStorage from '../../lib/Categories/LocalStorage';
import debug from './debug';


function handleGameRoomID(GameRoomID, handleSetAppState, IOTSubscribeToTopic) {
  handleSetAppState('GameRoomID', GameRoomID);
  debug.log('Received GameRoomID:', GameRoomID);
  IOTSubscribeToTopic(GameRoomID);

  putGameToDynamoDB(GameRoomID, null,
    (putRes) => {
      debug.log('Put game in DynamoDB!', putRes);
    },
    (exception) => {
      debug.log('Error putting game in DynamoDB', exception);
    }
  );
}


function handleGameRoomError(exception) {
  debug.log('Error generating a random GameRoomID!', JSON.stringify(exception));
}


export function playGame(
  game,
  quizTime,
  trickTime,
  handleSetAppState,
  handleCloseGame,
  navigation,
  IOTSubscribeToTopic,
) {
  const teamQuestions = {};
  game.questions.forEach((question, idx) => {
    teamQuestions[`team${idx}`] = {
      ...question,
      /*
       * question's default props:
      answer: PropTypes.string,
      image: PropTypes.string,
      instructions: PropTypes.arrayOf(PropTypes.string),
      question: PropTypes.string,
      uid: PropTypes.string,
      */
      tricks: [],
      choices: [],
      points: 0,
    };
  });

  const gameState = {
    GameID: game.GameID,
    banner: game.banner,
    grade: game.grade,
    domain: game.domain,
    cluster: game.cluster,
    standard: game.standard,
    favorite: game.favorite,
    title: game.description,
    description: game.description,
    quizTime,
    trickTime,
    ...teamQuestions,
    state: {},
  };
  
  handleSetAppState('gameState', gameState);

  generateUniqueGameRoomIDInDynamoDB(
    id => handleGameRoomID(id, handleSetAppState, IOTSubscribeToTopic),
    handleGameRoomError,
  );

  handleCloseGame();
  setTimeout(() => {
    navigation.navigate('TeacherGameRoom');
  }, 0);
}

export async function saveGamesToDatabase(updatedGames, account, handleSetAppState) {
  const { TeacherID } = account;
  if (TeacherID) {
    const stringifyGames = JSON.stringify(updatedGames);
    LocalStorage.setItem(`@RightOn:${TeacherID}/Games`, stringifyGames);

    const update = {
      gamesRef: {
        local: account.gamesRef.local + 1,
        db: account.gamesRef.db,
      },
    };
    handleSetAppState('account', update);

    updateTeacherGamesInTeacherAccountInDynamoDB(
      TeacherID,
      updatedGames,
      (res) => {
        update.gamesRef.db = account.gamesRef.db + 1;
        handleSetAppState('account', update);
        debug.log('Successfully PUT new teacher item into DynamoDB', JSON.stringify(res));
      },
      exception => debug.warn('Error PUTTING new teacher item into DynamoDB', JSON.stringify(exception)),
    );
  }
}
