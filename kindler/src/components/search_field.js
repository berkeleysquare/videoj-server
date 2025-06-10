import React, {useState} from 'react';
import { Button as IconButton} from '@mui/base/Button';
import {Input as TextField} from '@mui/base/Input';

export const styles = {
  button: {
    minWidth: '240px',
    display: 'inline-block',
    color: '#eee',
  },
  narrowControl: {
    margin: '2px',
    width: '140px',
    color: '#eee',
  },
};

const SearchHeader = props => {
  const {label, searchText, setSearch, disabled} = props;

  const [text, setText] = useState(searchText);

  const handleSearch = () => setSearch(text);

  const handleClear = () => {
    setSearch('');
    setText('');
  };

  const handleChange = event => {
    setText(event.target.value);
  }

  const onKey = event => {
    if(event.key === 'Enter'){
      handleSearch();
      event.preventDefault();
    }
  }

  const SearchButton = props => (<IconButton disabled={disabled} onClick={handleSearch} size="large">  
    🔍
  </IconButton>);

  const ClearButton = props => (<IconButton disabled={disabled} onClick={handleClear} size="large">
    ❌
  </IconButton>);

  return (
    <table><tbody><tr>
      <td><h3>{label}</h3></td>
      <td><ClearButton disabled={!text.length} styles={styles.button}/></td>
      <td><TextField styles={styles.narrowControl}
                 variant={'standard'}
                 value={text || ''}
                 onKeyDown={onKey}
                 onChange={handleChange}/></td>
      <td><SearchButton styles={styles.button} disabled={text === searchText || text.trim().length === 0}/></td>
    </tr></tbody></table>
  );
};

export default SearchHeader;
