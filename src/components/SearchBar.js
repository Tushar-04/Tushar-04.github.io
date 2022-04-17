import React from 'react';
import { useEffect, useState } from "react";
import './Serach_bar.css';
import SearchIcon from "@material-ui/icons/Search";
import Page1 from './Page1';

export default function SearchBar() {
    const [repoList, SetrepoList] = useState([]);
    const GetplaceList = async (query) => {
        console.log(query);
        const temp = await fetch(`https://api.github.com/search/repositories?q=language:Javascript&sort=stars&order=desc`).then(res => res.json());
        SetrepoList(temp.items);
    };
    const handleSearch = () => {
        GetplaceList(wordEnter)
    };
    const [wordEnter, setWordEnter] = useState("");
    const handleFilter = event => {
        const enteredWord = event.target.value;
        setWordEnter(enteredWord)
    };
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <>
            <div className="search">
                <div className="searchInputs">
                    <input type="text" placeholder='Search by Language' value={wordEnter} onChange={handleFilter} />
                    <h2 className='my-2 mx-1'>OR</h2>
                    <input type="text" placeholder='Search by Name' value={wordEnter} onChange={handleFilter} />
                </div>
                <div className="searchInputs">
                    <input type="text" placeholder='Page Number' value={wordEnter} onChange={handleFilter} />
                </div>
                <div className="searchInputs">
                    <input type="text" placeholder='Items Per Page' value={wordEnter} onChange={handleFilter} />
                </div>
                <div className="searchInputs">
                    <div className="icon" onClick={handleSearch}><SearchIcon /></div>
                </div>

            </div>
            {repoList.length !== 0 && (<Page1 title={repoList} />)}
        </>
    );
}
