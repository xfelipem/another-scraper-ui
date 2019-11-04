import React, { useState } from 'react';
import {
  withStyles, TableCell, TableRow, Paper, Table, TableHead, TableBody, Checkbox
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Extractor, Source } from '../interfaces/interfaces';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
}));

interface SourceExtractorRowProps {
  extractor?: Extractor,
  key: number,
  source: Source
}

const SourceExtractorRow = (props: SourceExtractorRowProps) => {
  const [isItemSelected, setSelected] = useState(false);
  const { extractor, key, source } = props;
  const { dataName } = extractor!;
  const { url } = source;
  const rowId = `${key}_${url}`;

  const handleClick = (event: React.MouseEvent<unknown>, rowId: string) => {
    console.log(event, rowId);
    setSelected(!isItemSelected);
  };

  return (
    <StyledTableRow
      hover
      onClick={event => handleClick(event, rowId)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={rowId}
      selected={isItemSelected}

    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={isItemSelected}
          inputProps={{ 'aria-labelledby': rowId }}
        />
      </TableCell>
      <StyledTableCell component="th" scope="row">{url}</StyledTableCell>
      <StyledTableCell align="right">{dataName}</StyledTableCell>
      <StyledTableCell align="right">{extractor}</StyledTableCell>
    </StyledTableRow>
  );
}

interface ExtractorTableProps {
  extractors?: Extractor[],
  sources: Source[]
}

export default function ExtractorTable(props: ExtractorTableProps): JSX.Element | React.FunctionComponentElement<{ key: number; }> {
  const { extractors, sources } = props;
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Url</StyledTableCell>
            <StyledTableCell align="right">Data name</StyledTableCell>
            <StyledTableCell align="right">Extractor</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            sources.map((source: Source, key) => {
              const extractor = extractors!.find(
                (extractor) => extractor.sources!.find(
                  (extractorSource) => extractorSource === source
                )
              );

              return (
                <SourceExtractorRow key={key} extractor={extractor} source={source} />
              )
            })
          }
        </TableBody>
      </Table>
    </Paper>
  );
}
