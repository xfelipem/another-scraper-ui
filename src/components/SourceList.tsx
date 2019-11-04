import React, { useState } from 'react';
import { IconButton, List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Source from '../interfaces/interfaces';
import { SourcesContext } from '../contexts';

const useStyles = makeStyles(() => ({
  list: {}
}));

interface SourceItemProps {
  source: Source,
}

const SourceItem = (props: SourceItemProps) => {
  const { source } = props;

  return (
    <ListItem>
      <ListItemText primary={`${source.url}`} />
      <ListItemSecondaryAction>
        <SourcesContext.Consumer>
          {({ removeSource }): any => (
            <IconButton edge="end" aria-label="delete" onClick={
              () => removeSource!({ url: source.url })
            }>
              <DeleteIcon />
            </IconButton>
          )}
        </SourcesContext.Consumer>
      </ListItemSecondaryAction>
    </ListItem >
  );
}

export default function SourceList(): JSX.Element | React.FunctionComponentElement<{ key: number; }> {
  const classes = useStyles();
  const [dense] = useState(false);

  return (
    <div className={classes.list}>
      <List dense={dense}>
        <SourcesContext.Consumer>
          {
            ({ sources }) => sources!.map(
              (source: Source, index) => <SourceItem key={index} source={source} />
            )
          }
        </SourcesContext.Consumer>
      </List>
    </div>
  );
}
