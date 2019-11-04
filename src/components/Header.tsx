import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Restore } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
  root: {},
});

export default function Header(): JSX.Element | React.FunctionComponentElement<{ key: number; }> {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Sources" icon={
        <NavLink to="/app/sources">
          <Restore />
        </NavLink>
      } />
      <BottomNavigationAction label="Extractors" icon={
        <NavLink to="/app/extractors">
          <Restore />
        </NavLink>
      } />
      <BottomNavigationAction label="Data" icon={
        <NavLink to="/app/data">
          <Restore />
        </NavLink>
      } />
    </BottomNavigation>
  );
}