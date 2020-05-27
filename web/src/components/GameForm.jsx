import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme => ({
  root: {
    padding: `${theme.spacing(2)}px`,
  },
  input: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  button: {
    marginRight: theme.spacing(2),
  },
  question: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  addQuestion: {
    marginBottom: theme.spacing(2),
  },
  hr: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  addLink: {
    padding: 0,
    verticalAlign: 'top',
  },
  noQuestions: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2),
  }
}));

function GameForm({ loading, saveGame, game: originalGame, gameIndex }) {
  const classes = useStyles();
  const history = useHistory();
  useEffect(() => {
    document.title = 'RightOn! | Edit game';
    return () => { document.title = 'RightOn! | Game management'; }
  }, []);
  useEffect(() => {
    setGame(originalGame)
  }, [originalGame]);
  const [game, setGame] = useState(originalGame || {
    title: '',
  });
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    saveGame(game);
    history.push('/');
  }, [game, history, saveGame]);
  const addQuestion = () => history.push(`/games/${gameIndex}/questions/${questions.length + 1}`);

  if (loading) return <Skeleton variant="rect" height={500} />;

  const questions = [1, 2, 3, 4, 5].filter(index => !!game[`q${index}`]);

  return (
    <>
      {questions.length < 5 && (
        <Button className={classes.addQuestion} color="primary" type="button" variant="contained" onClick={addQuestion}>
          Add question
        </Button>
      )}
      <form className={classes.root} noValidate autoComplete="off" onSubmit={(event) => event.preventDefault()}>
        <Typography gutterBottom variant="h4" component="h1">
          Editing "{game.title}"
        </Typography>
        {questions.length === 0 && (
          <Typography className={classes.noQuestions} gutterTop gutterBottom variant="h5" component="div">
            No questions yet. <Link onClick={addQuestion} component="button" variant="h5" className={classes.addLink}>Add a question.</Link>
          </Typography>
        )}
        {questions.map(index => {
          const { question, answer } = game[`q${index}`];
          return (
            <Paper className={classes.question}>
              <Typography gutterBottom>
                <strong>Q:</strong> {question}
              </Typography>
              <Typography>
                <strong>A:</strong> {answer}
              </Typography>
              <Button size="small" onClick={() => history.push(`/games/${gameIndex}/questions/${index}`)}>Edit</Button>
            </Paper>
          );
        })}

        <Divider className={classes.hr} />

        <Box>
          <Button type="submit" variant="contained" color="primary" onClick={handleSubmit} disabled={game === originalGame} className={classes.button}>
            Save
        </Button>
          <Button type="button" onClick={() => history.push('/')}>
            Cancel
        </Button>
        </Box>
      </form>
    </>
  );
}

export default GameForm;
