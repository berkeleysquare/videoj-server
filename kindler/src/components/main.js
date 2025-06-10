import React, {useEffect, useState} from "react";
import { Tab } from '@mui/base/Tab';
import { TabsList } from '@mui/base/TabsList';
import { Tabs } from '@mui/base/Tabs';

import SearchField from './search_field';
import {fetchBooks} from './actions';

const resource = 'books_all';
const SORT_DATE = "Date";
const SORT_TITLE = "Title";
const SORT_AUTHOR = "Author";
const sortTypes = [SORT_DATE, SORT_TITLE, SORT_AUTHOR];

const sortBooks = (unsorted, type) => {
  switch (type) {
    case SORT_DATE:
      return unsorted.sort((a, b) => a.index - b.index);
    case SORT_TITLE:
      return unsorted.sort((a, b) => a.title.localeCompare(b.title));
    case SORT_AUTHOR:
      return unsorted.sort((a, b) => extractAuthor(a).localeCompare(extractAuthor(b)));
    default:
      return unsorted;
  }
}

const extractTitle = b => (b.title || '').trim();
const extractAuthor = b => (b.author || '').trim();

const formatBook = b => <p key={'_book' + b.index}>
  <span style={{fontWeight: 600}}>{extractTitle(b) + '  '}</span>
  <span style={{fontStyle: 'italic'}}>{extractAuthor(b)}</span>
</p>

const formatBooks = (books, sortType) => {
  const lines = [];
  const getFirstLetter = sortType === SORT_DATE ? () => '' :
    (sortType === SORT_TITLE ? b => (extractTitle(b) + ' ')[0] : b => (extractAuthor(b) + ' ')[0]);
  let firstLetter = '';
    {books.forEach((element, i) => {
      if (getFirstLetter(element).toUpperCase() !== firstLetter) {
        firstLetter = getFirstLetter(element).toUpperCase();
        lines.push(
        <h1 key={'_letter_' + i} style={{backgroundColor: '#7393B3', color: 'white', marginTop: '45px'}}>
          {firstLetter}
        </h1>);
      }
      lines.push(formatBook(element));
    })};
  return (<div>{lines}</div>);
};


function Main() {

    const [books, setBooks] = useState([]);
    const [sortType, setSortType] = useState(SORT_DATE);
    const [searchTitleText, setSearchTitleText] = useState('');
    const [searchAuthorText, setSearchAuthorText] = useState('');

    useEffect(() => {
      setBooks(fetchBooks(resource, setBooks));
    }, []);

    const filteredBooks = (books || [])
      .filter(b => extractAuthor(b).toLowerCase().includes(searchAuthorText.toLowerCase()))
      .filter(b => extractTitle(b).toLowerCase().includes(searchTitleText.toLowerCase()));

    const sorted = sortBooks(filteredBooks, sortType);  

    return (<div>
      <div>
          <Tabs selectionFollowsFocus
            value={sortType}
            onChange={(e, val) => setSortType(val)}
            variant="fullWidth">
              <TabsList>
              {sortTypes.map(g => (<Tab key={'_button_' + g} value={g}>{' Sort by ' + g}</Tab>))}
              </TabsList>
          </Tabs>
      </div>
      <table width="100%"><tbody><tr>
        <td>
          <div style={{width: '300px', marginLeft: 'auto', marginRight: 'auto'}}>
            <SearchField label="Title" setSearch={setSearchTitleText} searchText={searchTitleText}/>
          </div>
        </td>
        <td>
          Sort by {sortType}
        </td>
        <td>
          <div style={{width: '300px', marginLeft: 'auto', marginRight: 'auto'}}>
            <SearchField label="Author" setSearch={setSearchAuthorText} searchText={searchAuthorText}/>
          </div>
        </td>
        </tr></tbody></table>
      {formatBooks(sorted, sortType)}
    </div>
    );
}

export default Main;