export interface Extractor {
  dataName: string,
  configuration: string,
  sources?: Source[]
}

export interface Source {
  url: string
}

export default Source;
