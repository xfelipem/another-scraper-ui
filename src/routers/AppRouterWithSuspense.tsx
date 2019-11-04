import React, { Suspense, lazy, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loading from '../components/Loading';
import Header from '../components/Header';
import { contextSources, SourcesContext, ExtractorsContext, contextExtractors } from '../contexts';
import Source, { Extractor } from '../interfaces/interfaces';
import ExtractorCrud from '../components/ExtractorCrud';

const SourceCrud = lazy(() => import('../components/SourceCrud'))

const AppRouterWithSuspense = (): JSX.Element | React.FunctionComponentElement<{ key: number; }> => {
  const [extractors, setExtractors] = useState(contextExtractors.extractors);
  const [sources, setSources] = useState(contextSources.sources);

  const pushExtractor = (extractor: Extractor): number => {
    const newExtractors = [...extractors];
    const index = newExtractors.push(extractor);

    setExtractors(newExtractors);

    return index;
  };
  const removeExtractor = (extractor: Extractor): void => {
    const newExtractors = extractors.filter(
      (currentExtractor) => currentExtractor.dataName !== extractor.dataName
    );

    setExtractors(newExtractors);
  };
  const pushSource = (source: Source): number => {
    const newSources = [...sources];
    const index = newSources.push(source);

    setSources(newSources);

    return index;
  };
  const removeSource = (source: Source): void => {
    const newSources = sources.filter(
      (currentSource) => currentSource.url !== source.url
    );

    setSources(newSources);
  };

  return (
    <SourcesContext.Provider value={{ sources, pushSource, removeSource }}>
      <ExtractorsContext.Provider value={{ extractors, pushExtractor, removeExtractor }}>
        <Header />
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path="/app/sources" component={SourceCrud} />
            <Route path="/app/extractors" component={ExtractorCrud} />
            <Route path="/app/data" component={SourceCrud} />
          </Switch>
        </Suspense>
      </ExtractorsContext.Provider>
    </SourcesContext.Provider>
  );
}

export default AppRouterWithSuspense;