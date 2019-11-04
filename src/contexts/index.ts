import React from 'react';
import Source, { Extractor } from '../interfaces/interfaces';

// Extractors
export type ContextExtractorsProps = {
  extractors: Extractor[],
  pushExtractor: (extractor: Extractor) => number,
  removeExtractor: (extractor: Extractor) => void
};

export const contextExtractors: ContextExtractorsProps = {
  extractors: Array(),
  pushExtractor: (extractor: Extractor): number => 0,
  removeExtractor: (extractor: Extractor): void => { }
};

export const ExtractorsContext = React.createContext(<Partial<ContextExtractorsProps>>({}));

//Sources
export type ContextSourcesProps = {
  sources: Source[],
  pushSource: (source: Source) => number,
  removeSource: (source: Source) => void
};

export const contextSources: ContextSourcesProps = {
  sources: Array(),
  pushSource: (source: Source): number => 0,
  removeSource: (source: Source): void => { }
};

export const SourcesContext = React.createContext(<Partial<ContextSourcesProps>>({}));
