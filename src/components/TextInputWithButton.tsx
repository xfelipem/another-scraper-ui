import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { AddCircleOutline } from '@material-ui/icons';
import { SourcesContext } from '../contexts';
import { FormControl, FormHelperText } from '@material-ui/core';

type ErrorInputLabelsProps = {
  textValue: string
};

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));
const urlRegexp = new RegExp('https?:(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?:(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,}');
const isUrl = (url: string): boolean => urlRegexp.test(url);
const isEmtpyString = (text: string): boolean => text === "";

const ErrorInputLabel = (props: ErrorInputLabelsProps) => {
  const { textValue } = props;
  const isTextAnUrl = isUrl(textValue);
  const isTextAnEmtpyString = isEmtpyString(textValue);

  if (isTextAnEmtpyString || isTextAnUrl) {
    return null;
  }

  return (
    <FormHelperText id="new-source-error">Must be an url</FormHelperText>
  );
}

export default function TextInputWithButton() {
  const classes = useStyles();
  const [textValue, setTextValue] = useState('');
  const isTextAnUrl = isUrl(textValue);
  
  return (
    <>
      <Paper className={classes.root}>
        <div className={classes.container}>
          <FormControl className={classes.formControl} error={!isTextAnUrl}>
            <InputBase
              autoFocus
              id="new-source"
              aria-describedby="my-helper-text"
              className={classes.input}
              placeholder="https://www.example.com"
              inputProps={{ 'aria-label': 'https://www.example.com' }}
              value={textValue}
              onChange={(event) => setTextValue(event.target.value)}
            />
            <ErrorInputLabel textValue={textValue} />
          </FormControl>
        </div>
        <Divider className={classes.divider} orientation="vertical" />
        <SourcesContext.Consumer>
          {({ pushSource }): any => (
            <IconButton
              color="primary"
              className={classes.iconButton}
              aria-label="directions"
              onClick={() => {
                if (isTextAnUrl) {
                  pushSource!({ url: textValue })
                  setTextValue('');
                }
              }}
            >
              <AddCircleOutline />
            </IconButton>
          )}
        </SourcesContext.Consumer>
      </Paper >
    </>
  );
}
