import Realm from 'realm';

class Human extends Realm.Object {};
Human.schema = {
  name: 'Human',
  properties: {
    name: 'string?',
    location: 'string?',
    image: 'string?',
    points: 'int',
  }
};

class Games extends Realm.Object {};
Games.schema = {
  name: 'Games',
  properties: {
    history: 'string[]',
  }
};

const Schema = [
  Human,
  Games,
];

export default Schema;