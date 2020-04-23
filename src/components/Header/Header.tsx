import React from 'react';
import classes from './Header.module.css';
import Logo from './Logo/Logo';
import SearchBar from './SearchBar/SearchBar';
import Menu from './Menu/Menu';

const Header = () => {
    return (
        <header className={classes.Header}>
            <Logo />
            <SearchBar />
            <Menu />
        </header>
    );
};

export default Header;
