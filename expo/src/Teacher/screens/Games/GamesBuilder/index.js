import React, { NativeMethodsMixin } from 'react';
import {
  findNodeHandle,
  Image,
  Modal,
  ScrollView,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { gamePropTypes, gameDefaultProps } from '../../../../config/propTypes';
import Swiper from 'react-native-swiper';
import Touchable from 'react-native-platform-touchable';
import Aicon from 'react-native-vector-icons/FontAwesome';
import { verticalScale } from 'react-native-size-matters';
import ButtonMenu from '../../../../components/ButtonMenu';
import ButtonWide from '../../../../components/ButtonWide';
import ButtonStart from '../../../../components/ButtonStart';
import InputModal from '../../../../components/InputModal';
import Menu from '../../../../components/Menu';
import Message from '../../../../components/Message';
import GamesShare from '../components/GamesShare';
import SelectionModal from '../../../../components/SelectionModal';
import { domainSelection, domainSelectionHS, standardSelection, gradeSelection, clusterSelection } from '../../../../config/selections';
import GamesBuilderQuestion from './GamesBuilderQuestion';
import { elevation, fonts } from '../../../../utils/theme';
import styles from './styles';


export default class GamesBuilder extends React.Component {
  static propTypes = {
    currentGame: PropTypes.number,
    handleClose: PropTypes.func.isRequired,
    handleCreateGame: PropTypes.func.isRequired,
    handleDeleteGame: PropTypes.func.isRequired,
    handlePlayGame: PropTypes.func.isRequired,
    game: gamePropTypes,
    explore: PropTypes.bool,
    TeacherID: PropTypes.string,
    visible: PropTypes.bool.isRequired,
  };
  
  static defaultProps = {
    currentGame: null,
    handleClose: () => {},
    handleCreateGame: () => {},
    handleDeleteGame: () => {},
    handlePlayGame: () => {},
    game: gameDefaultProps,
    explore: false,
    TeacherID: '',
    visible: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      addQuestion: {},
      edited: false,
      game: {
        grade: null,
        domain: null,
        cluster: null,
        standard: null,
        description: null,
        favorite: false,
        questions: [],
        title: null,
      },
      messageProps: null,
      showInput: false,
      showMenu: false,
      showSelection: false,
      showShare: false,
    };
  }


  componentDidMount() {
    this.hydrateState(this.props.game);
  }


  /*
   * Measure the layout of the view for pinpointing where
   * on the x, y axis the InputModal should display the input.
   */
  onTitleLayout = () => {
    if (this.titleRef) {
      NativeMethodsMixin.measureInWindow.call(
        findNodeHandle(this.titleRef),
        (x, y) => {
          this.titleX = x;
          this.titleY = y + 12 + fonts.small;
        }
      );
    }
  }


  onDescriptionLayout = () => {
    if (this.descriptionRef) {
      NativeMethodsMixin.measureInWindow.call(
        findNodeHandle(this.descriptionRef),
        (x, y) => {
          this.descriptionX = x;
          this.descriptionY = y + 12 + fonts.small;
        }
      );
    }
  }


  /*
   * Keep track of when properties are edited to conditionally
   * display the "Save" button.
   */
  setEdited = () => {
    const { edited } = this.state;
    if (!edited) {
      this.setState({ edited: true });
    }
  }

  
  /*
   * Hydrate the state with provided `game` properties or
   * set it to the initial state if it's viewing an empty, default game.
   */
  hydrateState = (game) => {
    if (game && Object.keys(game).length) {
      this.setState({ game });
    } else {
      this.setState({ 
        game: {
          grade: null,
          domain: null,
          cluster: null,
          standard: null,
          description: null,
          favorite: false,
          questions: [],
          title: null,
        }
      });
    }
  }


  /*
   * Exits out of the modal screen that this component renders in.
   * Upon exiting, it checks whether the game was 'favorited,'
   * if it was and there weren't other edits, we will update its favorite property.
   */
  handleCloseGame = () => {
    const { explore, handleClose } = this.props;
    const { edited, game } = this.state;
    if (explore && game.favorite && !edited) {
      // TODO! REMOVE THIS CONDITION BECAUSE PRESSING CLONE ACTION AUTOMATICALLY SAVES
      this.createGame();
    } else if (this.props.game.favorite !== game.favorite && !edited) {
      // Automatically update game is `favorite` was update but fields were not.
      this.createGame();
    }
    handleClose();
  }


  toggleFavorite = () => {
    const { game } = this.state;
    this.setState({ game: { ...game, favorite: !game.favorite } });
    if (game.favorite) {
      this.handleShowMessage('Removed from Favorites');
    } else {
      this.handleShowMessage('Saved to Favorites');
    }
  }


  createGame = () => {
    const { game } = this.state;
    const { handleCreateGame } = this.props;
    if (this.props.currentGame !== null || game.GameID) {
      // If the game already exists...
      const saveGame = { ...game };
      if (this.props.game.quizmaker && this.state.edited) {
        // This game was cloned from the Explore tab and it has just been edited
        // so now we will remove its `quizmaker` property and assign it a new `GameID`.
        delete saveGame.quizmaker;
        saveGame.GameID = `${Math.random()}`;
        handleCreateGame(saveGame);
      } else if (this.props.explore) {
        // Clone game from Explore - prepend "Clone of" to its `title`.
        saveGame.title = `Clone of ${saveGame.title}`;
        handleCreateGame(saveGame);
      } else {
        // It's a custom game so we'll just overwrite its existing properties.
        handleCreateGame(saveGame);
      }
    } else {
      // If the game doesn't exist, create a new one with a brand spankin' new `GameID`.
      handleCreateGame({ ...game, GameID: `${Math.random()}` });
    }
  }


  handleTitleRef = (ref) => { this.titleRef = ref; }


  handleDescriptionRef = (ref) => { this.descriptionRef = ref; }


  closeInputModal = (input, inputLabel) => {
    switch (inputLabel) {
      case 'title':
        this.setState({ game: { ...this.state.game, title: input }, showInput: false });
        break;
      case 'description':
        this.setState({ game: { ...this.state.game, description: input }, showInput: false });
        break;
      default:
        break;
    }
    this.setEdited();    
  }


  handleInputModal = (inputLabel, placeholder, maxLength, input = '', keyboardType = 'default') => {
    if (this.props.explore) return;
    if (inputLabel === 'title') {
      this.onTitleLayout();
    } else if (inputLabel === 'description') {
      this.onDescriptionLayout();
    }
    setTimeout(() => {
      this.setState({
        showInput: {
          autoCapitalize: 'sentences',
          closeModal: this.closeInputModal,
          keyboardType,
          input,
          inputLabel,
          maxLength,
          multiline: false,
          placeholder,
          visible: true,
          spellCheck: true,
          x: this[`${inputLabel}X`],
          y: this[`${inputLabel}Y`],
        }
      });
    }, 100);
  }


  openAddQuestion = (event, question = {}, edit) => {
    this.setState({ addQuestion: { ...question, edit } });
    this.swiperRef.scrollBy(1, false);
  }


  closeAddQuestion = (event, question, edit) => {
    const { game } = this.state;
    if (typeof edit === 'number') {
      const updatedGame = { ...game };
      updatedGame.questions.splice(edit, 1, question);
      this.setState({ addQuestion: {}, game: updatedGame });
    } else if (question) {
      this.setState({
        addQuestion: {},
        game: { ...game, questions: [...game.questions, question] },
      });
    } else {
      this.setState({ addQuestion: {} });
    }
    this.swiperRef.scrollBy(-1, false);
    this.setEdited();
  }


  showGradeSelection = () => {
    if (this.props.explore) return;
    this.setState({ showSelection: 'Grade' });
  }


  showDomainSelection = () => {
    if (this.props.explore || this.state.game.grade === 'General') return;
    this.setState({ showSelection: 'Domain' });
  }


  showClusterSelection = () => {
    if (this.props.explore || this.state.game.grade === 'General') return;
    this.setState({ showSelection: 'Cluster' });
  }


  showStandardSelection = () => {
    if (this.props.explore || this.state.game.grade === 'General') return;
    this.setState({ showSelection: 'Standard' });
  }


  hideSelection = (selection) => {
    if (typeof selection === 'object') { // Dismiss the event object
      this.setState({ showSelection: false });
      return;
    }
    const { showSelection } = this.state;
    switch (showSelection) {
      case 'Grade': 
        if (selection === 'General') {
          this.setState({
            game: { ...this.state.game, grade: 'General', domain: null, cluster: null, standard: null },
            showSelection: false,
          });
        } else if ((selection === 'HS' && this.state.game.grade !== 'HS') ||
          (selection !== 'HS' && this.state.game.grade === 'HS')) {
          this.setState({
            game: {
              ...this.state.game,
              grade: selection || this.props.game.grade,
              domain: null,
              cluster: null,
              standard: null,
            },
            showSelection: false,
          });
        } else {
          this.setState({
            game: { ...this.state.game, grade: selection || this.props.game.grade },
            showSelection: false,
          });
        }
        break;
      case 'Domain': 
        this.setState({
          game: { ...this.state.game, domain: selection || this.props.game.domain },
          showSelection: false,
        });
        break;
      case 'Cluster': 
        this.setState({
          game: { ...this.state.game, cluster: selection || this.props.game.cluster },
          showSelection: false,
        });
        break;
      case 'Standard': 
        this.setState({
          game: { ...this.state.game, standard: selection || this.props.game.standard },
          showSelection: false,
        });
        break;
      default:
        this.setState({ showSelection: false });
        break;
    }
    this.setEdited();
  }


  toggleMenu = () => this.setState({ showMenu: !this.state.showMenu });


  toggleShare = () => this.setState({ showMenu: false, showShare: !this.state.showShare });


  handleDeleteConfirmation = () => this.props.handleDeleteGame();


  handleShowMessage = (message) => {
    this.setState({
      messageProps: {
        closeFunc: this.handleCloseMessage,
        message,
      },
    });
  }


  handleCloseMessage = () => {
    this.setState({ messageProps: null });
  }


  renderQuestionBlock = (question, idx) => (
    <Touchable
      activeOpacity={0.8}
      key={question.uid}
      onPress={() => this.openAddQuestion(null, question, idx)}
    >
      <View style={[styles.questionContainer, elevation]}>

        {question.image && question.image !== 'null' &&
          <Image source={{ uri: question.image }} style={styles.questionImage} />}
          
        <View style={styles.questionTextContainer}>
          <Text style={styles.questionQuestion}>{`Q: ${question.question}`}</Text>
          <Text style={[styles.questionAnswer, styles.colorPrimary]}>{`A: ${question.answer}`}</Text>
          <Text style={[styles.questionQuestion, styles.questionInstructions]}>
            { `${question.instructions.length} ${question.instructions.length === 1 ? 'Solution step' : 'Solution steps'}` }
          </Text>

          {(!question.question || !question.answer) &&
            <Aicon name={'exclamation-triangle'} style={styles.warning} />}

        </View>
      </View>
    </Touchable>
  );


  renderQuestions = () => {
    const { questions } = this.state.game;
    if (Array.isArray(questions)) {
      return (
        <View style={styles.questionsContainer}>
          {Boolean(questions.length) && <Text style={styles.inputLabel}>Questions</Text>}
          {questions.map((question, idx) => this.renderQuestionBlock(question, idx))}
        </View>
      );
    }
    return null;
  }


  render() {
    const {
      explore,
      // handleClose,
      handlePlayGame,
      visible,
    } = this.props;

    const {
      GameID,
      grade,
      domain,
      cluster,
      standard,
      description,
      favorite,
      title,
    } = this.state.game;

    const {
      addQuestion,
      edited,
      messageProps,
      showInput,
      showMenu,
      showSelection,
      showShare,
    } = this.state;

    let action = '';
    if (explore) {
      action = 'Clone';
    } else if (edited) {
      action = 'Save';
    }

    let selectionItems = [];
    if (showSelection) {
      switch (showSelection) {
        case 'Grade':
          selectionItems = gradeSelection;
          break;
        case 'Domain':
          if (!grade) {
            break;
          } else if (grade === 'HS') {
            selectionItems = domainSelectionHS;
          } else {
            selectionItems = domainSelection;
          }
          break;
        case 'Cluster':
          selectionItems = clusterSelection;
          break;
        case 'Standard':
          selectionItems = standardSelection;
          break;
        default:
          break;
      }
    }

    let ccs = '';
    if (grade === 'General') {
      ccs = 'General';
    } else if (grade && domain && cluster && standard) {
      ccs = `${grade === 'HS' ? '' : `${grade}.`}${domain}.${cluster}.${standard}`;
    }

    return (
      <Modal
        animationType={'slide'}
        onRequestClose={this.handleCloseGame}
        transparent={false}
        visible={visible}
      >
        <Swiper
          horizontal={false}
          index={0}
          loadMinimal={false}
          loop={false}
          ref={(ref) => { this.swiperRef = ref; }}
          scrollEnabled={false}
          showsPagination={false}
        >
          <View style={styles.container}>

            {showInput &&
              <InputModal {...showInput} />}

            {messageProps &&
              <Message {...messageProps} />}

            {showMenu && 
              <Menu
                handleClose={this.toggleMenu}
                items={[
                  { onPress: this.toggleShare, label: 'Share' },
                  !explore && { onPress: this.handleDeleteConfirmation, label: 'Delete' },
                ]}
              />}

            {showShare && 
              <GamesShare
                handleClose={this.toggleShare}
                game={{ ...this.state.game, shared: this.props.TeacherID }}
              />}
            
            {Boolean(GameID) && 
              <ButtonStart onPress={() => handlePlayGame(null, this.state.game)} />}

            {Boolean(showSelection) &&
              <SelectionModal
                handleClose={this.hideSelection}
                items={selectionItems}
                onSelect={this.hideSelection}
                title={showSelection}
                visible={Boolean(showSelection)}
              />}

            <View style={[styles.headerContainer, elevation]}>
            
              <Touchable
                hitSlop={{ top: 25, right: 25, bottom: 25, left: 25 }}
                onPress={this.handleCloseGame}
              >
                <View style={styles.closeContainer}>
                  <Aicon name={'close'} style={[styles.closeIcon, styles.closeIconShadow]} />
                  <Aicon name={'close'} style={styles.closeIcon} />
                </View>
              </Touchable>

              {!explore && <Text style={styles.title}>Game Builder</Text>}
              <Touchable
                hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                onPress={this.createGame}
                style={[styles.createContainer, action === 'Clone' && styles.right]}
              >
                <Text style={styles.createLabel}>{ action }</Text>
              </Touchable>

              {!explore &&
                <Touchable
                  hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}
                  onPress={this.toggleFavorite}
                  style={styles.heartWrapper}
                >
                  <View style={styles.heartContainer}>
                    <Aicon name={'heart'} style={[styles.heartIcon, styles.heartIconBig]} />
                    <Aicon name={'heart'} style={[styles.heartIcon, favorite && styles.colorPrimary]} />
                  </View>
                </Touchable>}

              {!explore && <ButtonMenu onPress={this.toggleMenu} />}
            </View>

            <ScrollView contentContainerStyle={styles.scrollview}>

              <View
                onLayout={this.onTitleLayout}
                ref={this.handleTitleRef}
                style={styles.inputContainer}
              >
                <Text style={styles.inputLabel}>Game Title</Text>
                <Touchable
                  onPress={() => this.handleInputModal('title', 'Enter title', 75, title)}
                  style={[styles.inputButton, elevation]}
                >
                  <Text style={[styles.inputButtonText, !title && styles.placeholder]}>
                    {showInput && showInput.inputLabel === 'title' ? null : title || 'Enter title'}
                  </Text>
                </Touchable>
              </View>

              <View
                onLayout={this.onDescriptionLayout}
                ref={this.handleDescriptionRef}
                style={styles.inputContainer}
              >
                <Text style={styles.inputLabel}>Description</Text>
                <Touchable
                  onPress={() => this.handleInputModal('description', 'Enter description', 100, description)}
                  style={[styles.inputButton, elevation]}
                >
                  <Text
                    style={[
                      styles.inputButtonText, 
                      !description && styles.placeholder
                    ]}
                  >
                    {showInput && showInput.inputLabel === 'description' ? null : description || 'Enter description'}
                  </Text>
                </Touchable>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Common Core Standard</Text>
                <Text style={styles.inputLabel}>{ ccs }</Text>
                <Touchable
                  onPress={this.showGradeSelection}
                >
                  <View style={[styles.inputButton, elevation, styles.row, styles.spaceBetween]}>
                    <Text style={[styles.inputButtonText, !grade && styles.colorPrimary]}>
                      { grade || 'Grade' }
                    </Text>
                    {!explore && <Aicon name={'caret-down'} style={[styles.caret, styles.colorPrimary]} />}
                  </View>
                </Touchable>

                <Touchable
                  onPress={this.showDomainSelection}
                >
                  <View style={[styles.inputButton, elevation, styles.row, styles.spaceBetween, grade === 'General' && styles.inactive]}>
                    <Text style={[styles.inputButtonText, !domain && styles.colorPrimary]}>
                      { domain || 'Domain' }
                    </Text>
                    {!explore && <Aicon name={'caret-down'} style={[styles.caret, styles.colorPrimary]} />}
                  </View>
                </Touchable>

                <Touchable
                  onPress={this.showClusterSelection}
                >
                  <View style={[styles.inputButton, elevation, styles.row, styles.spaceBetween, grade === 'General' && styles.inactive]}>
                    <Text style={[styles.inputButtonText, !cluster && styles.colorPrimary]}>
                      { cluster || 'Cluster' }
                    </Text>
                    {!explore && <Aicon name={'caret-down'} style={[styles.caret, styles.colorPrimary]} />}
                  </View>
                </Touchable>

                <Touchable
                  onPress={this.showStandardSelection}
                >
                  <View style={[styles.inputButton, elevation, styles.row, styles.spaceBetween, grade === 'General' && styles.inactive]}>
                    <Text style={[styles.inputButtonText, !standard && styles.colorPrimary]}>
                      { standard || 'Standard' }
                    </Text>
                    {!explore && <Aicon name={'caret-down'} style={[styles.caret, styles.colorPrimary]} />}
                  </View>
                </Touchable>
              </View>
              
              {this.renderQuestions()}

              {!explore && 
                <ButtonWide
                  buttonStyles={{ position: 'relative', marginVertical: verticalScale(25) }}
                  onPress={this.openAddQuestion}
                  label={'Add question'}
                />}

            </ScrollView>

          </View>

          <GamesBuilderQuestion
            closeModal={this.closeAddQuestion}
            question={addQuestion}
            explore={explore}
          />

        </Swiper>
      </Modal>
    );
  }
}
