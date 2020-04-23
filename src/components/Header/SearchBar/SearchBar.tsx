import React, { useState } from 'react';
import classes from './SearchBar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import * as actionsVideos from '../../../store/actions/actionsVideos';
import { AppState } from '../../..';
import { withRouter } from 'react-router-dom';

const SearchBar = (props: any) => {
    const [searchInput, setsearchInput] = useState({ value: '' });

    const menuItems_ = useSelector((state: AppState) => state.reducer_Videos.menuItems);

    const dispatch = useDispatch();
    const on_Get_Data = (searchInput: { value: string }, menuItemsCopy: any[]) =>
        dispatch(actionsVideos.getData(searchInput, menuItemsCopy));

    const onSearchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const updateSearch = { ...searchInput, value: e.target.value };
        setsearchInput(updateSearch);
    };

    const onSearchButtonHandler = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const searchHistory_: string[] = [];
        const elIndex: number = menuItems_.findIndex((el) => el.itemTitle === 'Search history');
        const menuItemsCopy: any[] = [...menuItems_];

        searchHistory_.push(...menuItemsCopy[elIndex].content);
        const updateSearchHistory = searchHistory_.concat(searchInput.value);

        menuItemsCopy[elIndex] = { ...menuItemsCopy[elIndex], content: updateSearchHistory };

        on_Get_Data(searchInput, menuItemsCopy);

        // CLEAR THE SEARCH BAR
        setsearchInput({ value: '' });
        props.history.push('/search');
    };

    return (
        <div className={classes.SearchBar} onSubmit={onSearchButtonHandler}>
            <form>
                <input
                    type="text"
                    placeholder="Search..."
                    name="search"
                    onChange={(e) => onSearchInputHandler(e)}
                    value={searchInput.value}
                />
                <button type="submit" onClick={(e) => onSearchButtonHandler(e)}>
                    <i></i>Search
                </button>
            </form>
        </div>
    );
};

export default withRouter(SearchBar);
