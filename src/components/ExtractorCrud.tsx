import React, { Suspense, useState } from 'react';
import TextInputWithButton from './TextInputWithButton';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Loading from './Loading';
import { SourcesContext, contextSources } from '../contexts';
import Source from '../interfaces/interfaces';

const ExtractorList = React.lazy(() => import('./ExtractorList'));

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

export default function ExtractorCrud(): JSX.Element | React.FunctionComponentElement<{ key: number; }> {
  const classes = useStyles();
  const [sources, setSources] = useState(contextSources.sources);
  const pushSource = (source: Source): number => {
    const newSources = [...sources];
    const index = newSources.push(source);

    setSources(newSources);

    return index;
  }
  const removeSource = (source: Source): void => {
    const newSources = sources.filter(
      (currentSource) => currentSource.url !== source.url
    );

    setSources(newSources);
  }

  return (
    <SourcesContext.Provider value={{ sources, pushSource, removeSource }}>
      <Suspense fallback={<Loading />}>
        <ExtractorList sources={sources}/>
      </Suspense>
    </SourcesContext.Provider>
  );
}
