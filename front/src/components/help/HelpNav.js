import React from 'react';
import { NavLink } from 'react-router-dom';
import dataHelpMenu from '../../assets/api/dataHelpMenu';
import { NavHelp } from '../../styles/help/help_nav';

const HelpNav = () => {
  const selectedNavStyle = {
    color: '#000000',
    fontWeight: 500,
  };
  return (
    <NavHelp>
      <ul>
        {Object.entries(dataHelpMenu).map(([name, link]) => (
          <li key={link}>
            <NavLink to={`/help/${link}`} style={({ isActive }) => (isActive ? selectedNavStyle : undefined)}>
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </NavHelp>
  );
};

export default HelpNav;
