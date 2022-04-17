import React from 'react';
import { useEffect, useState } from "react";
import './Serach_bar.css';
import SearchIcon from "@material-ui/icons/Search";
import Page1 from './Page1';
import { DropdownButton } from 'react-bootstrap'
import { Dropdown } from 'react-bootstrap'
export default function SearchBar() {
    const [repoList, SetrepoList] = useState([]);
    const GetrepoList = async (l, n, s, o, p, pi) => {
        if (l != "" && n == "") {
            const temp = await fetch(`https://api.github.com/search/repositories?q=language:${l}&sort=${s}&order=${o}&page=${p}&per_page=${pi}`).then(res => res.json());
            SetrepoList(temp.items);
        }
        else if (l == "" && n != "") {
            const temp = await fetch(`https://api.github.com/search/repositories?q=name:${n}&sort=${s}&order=${o}&page=${p}&per_page=${pi}`).then(res => res.json());
            SetrepoList(temp.items);
        }
        else if (l != "" && n != "") {
            const temp = await fetch(`https://api.github.com/search/repositories?q=language:${l}&name:${n}&sort=${s}&order=${o}&page=${p}&per_page=${pi}`).then(res => res.json());
            SetrepoList(temp.items);
        }
        console.log(o);
    };
    const handleSearch = () => {
        GetrepoList(wordEnter, sname, sort, order, currentPage, postsPerPage)
    };
    const [wordEnter, setWordEnter] = useState("");
    const handleFilter = event => {
        const enteredWord = event.target.value;
        setWordEnter(enteredWord)
    };
    const [sname, setsname] = useState("");
    const handlesname = event => {
        const enteredWord = event.target.value;
        setsname(enteredWord)
    };
    const [currentPage, setCurrentPage] = useState("");
    const handlecurrentPage = event => {
        const enteredWord = event.target.value;
        setCurrentPage(enteredWord)
    };
    const [postsPerPage, setpostsPerPage] = useState("");
    const handlepostsPerPage = event => {
        const enteredWord = event.target.value;
        setpostsPerPage(enteredWord)
    };
    const [sort, setsort] = useState("stars");
    const [order, setorder] = useState("desc");
    const changeoder=(o)=>{
        setorder(o);
        GetrepoList(wordEnter, sname, sort, o, currentPage, postsPerPage);
    }
    const changesort=(s)=>{
        setsort(s);
        GetrepoList(wordEnter, sname, sort, order, currentPage, postsPerPage);
    }
    return (
        <>
            <div className="search">
                <div className="searchInputs">
                    <input type="text" placeholder='Search by Language' value={wordEnter} onChange={handleFilter} />
                    <h2 className='my-2 mx-1'>OR</h2>
                    <input type="text" placeholder='Search by Name' value={sname} onChange={handlesname} />
                </div>
                <div className="searchInputs">
                    <input type="text" placeholder='Page Number' value={currentPage} onChange={handlecurrentPage} />
                </div>
                <div className="searchInputs">
                    <input type="text" placeholder='Items Per Page' value={postsPerPage} onChange={handlepostsPerPage} />
                </div>
                <div className="searchInputs">
                    <div className="icon" onClick={handleSearch}><SearchIcon /></div>
                </div>
                <div className='drop'>
                {repoList.length !== 0 &&(
                <><DropdownButton id="dropdown-basic-button" title="Sort by">
                    <Dropdown.Item onClick={()=>{changesort("star");}}>Stars</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{changesort("name");}}>Name</Dropdown.Item>
                </DropdownButton>
                <DropdownButton id="dropdown-basic-button" title="Order">
                    <Dropdown.Item onClick={()=>{changeoder("asc");}}>Ascending</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{changeoder("desc");}}>Descending</Dropdown.Item>
                </DropdownButton>
                </>)}
                </div>                
            </div>

            {repoList.length !== 0 && (<Page1 title={repoList} />)}
        </>
    );
}
