import React from 'react';

interface HeaderProps {
  children?: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return <header className="bg-card border-b border-border">{children}</header>;
};

export default Header;
