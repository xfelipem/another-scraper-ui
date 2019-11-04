import React, { Suspense } from 'react';
import TextInputWithButton from './TextInputWithButton';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Loading from './Loading';

const SourceList = React.lazy(() => import('./SourceList'));

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  title: {
    margin: 2,
    paddingTop: 8
  },
}));

export default function SourceCrud(): JSX.Element | React.FunctionComponentElement<{ key: number; }> {
  const classes = useStyles();

  return (
    <>
      <TextInputWithButton />
      <Grid item xs={12} md={6}>
        <Typography className={classes.title}>
          Urls to the sources of the data we want to scrap:
        </Typography>
        <Suspense fallback={<Loading />}>
          <SourceList />
        </Suspense>
      </Grid>
    </>
  );
}
