import React, {useState, useEffect} from "react";
import {connect} from 'react-redux';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

import {formatList} from './setlist_formatting';
import {getDataArray, isFetching, fetchResource} from "./common/actions";
import {CircularProgress} from "@material-ui/core";
import DownloadButton from "./components/download_button";
import Button from "@material-ui/core/Button";

const SORT_TYPE_TITLE = 'title';
const SORT_TYPE_ID = 'id';
const sortOptions = [
  {value: SORT_TYPE_TITLE, label: 'Title A -> Z'},
  {value: SORT_TYPE_ID, label: 'ID New -> Old'}
];

const SongButton = props => {
  const {title, onClick} = props;

  return (
    <Button variant="outlined" color="primary" onClick={onClick}>
      {title}
    </Button>
  )
};
const inList = (title, list) => {
  return list.find(s => s.title === title) !== undefined;
};


const setlist = props => {
  const {album, loadedSetList, setLists = [], fetching} = props;

  console.log('setlist props', props);

  const albumTitle = album.title || '';

  const [title, setTitle] = useState('');
  const [setList, setSetList] = useState([]);
  const [setListTitle, setSetListTitle] = useState('');
  const [sortType, setSortType] = useState(SORT_TYPE_ID);
  const [loadFrom, setLoadFrom] = useState('');

  useEffect(() => {
    const {fetchSetLists} = props;
    fetchSetLists();
  }, []);
  
  useEffect(() => {  
    setSetList(loadedSetList.setList || []);
    setSetListTitle(loadedSetList.setListTitle || '');
  }, [JSON.stringify(loadedSetList)]);

  const onLoadFrom = resource => {
    const {fetchSetList} = props;
    setLoadFrom(resource);
    fetchSetList(resource);
  }

  const handleSortChange = event => {
    setSortType(event.target.value);
  };

  const addSong = songTitle => {
    const newList = setList.slice();
    newList.push(songTitle);
    setSetList(newList);
  }

  const removeSong = index => {
    const newList = setList.slice();
    newList.splice(index, 1);
    setSetList(newList);
  }

  const songUp = index => {
    if ((index > 0) && (setList.length > index)) {
      const newList = setList.slice();
      [newList[index], newList[index-1]] = [newList[index-1], newList[index]];
      setSetList(newList);    }
  }

  const songDown = index => {
    if ((index >= 0) && (setList.length > index + 1)) {
      const newList = setList.slice();
      [newList[index+1], newList[index]] = [newList[index], newList[index+1]];
      setSetList(newList);    }
  }

  if (!album.title) {
    return (<div/>);
  }
  if (fetching) {
    return (<CircularProgress/>)
  }

  const videos = album.data || [];

  const handleSearchChange = event => {
    setTitle(event.target.value);
  }

  const handleSetListTitleChange = event => {
    setSetListTitle(event.target.value);
  }

  const sortById = (a, b) => b.id > a.id ? 1 : -1;
  const sortByTitle = (a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
  ;
  const sortedVideos = videos.sort(sortType === SORT_TYPE_ID ? sortById : sortByTitle);

  const searchedVideos = (title && title.length) ?
    sortedVideos.filter(v => v.title.toLowerCase().startsWith(title.toLowerCase())) :
    sortedVideos;

  return (
    <div className="App">
      <Paper elevation={2}>
        <table width={'50%'}>
        <tr>
            <td colSpan={3}>
              <Typography variant={'h4'}>{albumTitle}</Typography>
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              <TextField value={setListTitle}
                         label={'Setlist Title'}
                         onChange={handleSetListTitleChange} />             
            </td>
            <td>
              <InputLabel shrink={true}>Load Setlist</InputLabel>
              <Select onChange={e => onLoadFrom(e.target.value)}>
                {setLists.map((s, i) => (
                  <MenuItem key={'setlist_' + i} value={s.replace('.json','')}>{s}</MenuItem>
                ))}
              </Select>
            </td>
          </tr>
          <tr>
            <td>
              <TextField value={title}
                         label={'Search Song Titles'}
                         onChange={handleSearchChange} />     
            </td>
            <td>
              <InputLabel shrink={true}>Sort</InputLabel>
              <Select onChange={handleSortChange} value={sortType}>
                {sortOptions.map((o,i) => <MenuItem key={'sorttype_' + i} value={o.value}>{o.label}</MenuItem>)}
              </Select> 
            </td>
            <td>
              <p>{(searchedVideos || []).length} songs found</p>           
            </td>
          </tr>
        </table>
      </Paper>
      <table>
        <tr>
          <td valign={'top'}>
            <h4>Songs</h4>
            {searchedVideos.map(v => ((<>
              {inList(v.title, setList) && <span>&#x2713; </span>}
              <SongButton title={v.title} onClick={addSong.bind(null, v)} />
              <br/>
            </>)))}
          </td>
          <td valign={'top'}>
            <h4>{setListTitle}</h4>
            {setList.length > 0 && 
              <DownloadButton obj={formatList(setList, setListTitle)} title={setListTitle} type={'text'}/>}
            <br/>
            {setList.map((v,i) => ((<>
              <Button>{i + 1}</Button>
              <SongButton title={v.title}/>
              {i > 0 && <Button onClick={songUp.bind(null, i)}>UP</Button>}
              {i < setList.length - 1 && <Button onClick={songDown.bind(null, i)}>DOWN</Button>}
              <Button onClick={removeSong.bind(null, i)}>X</Button>
              <br/>
            </>)))}
            <DownloadButton obj={{setList, setListTitle}} title={setListTitle} type={'setlist'}/>
          </td>
        </tr>
      </table>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  const albumName = ownProps.album || '';
  const album = state['collection/' + albumName] || {};
  const setListsState = state.setlists || {};
  const loadedSetList = state.setlist || {};

  return {
    album,
    setLists: getDataArray(setListsState),
    loadedSetList: getDataArray(loadedSetList),
    fetching: isFetching([album, setListsState])
  };
};

function mapDispatchToProps(dispatch) {
  return {
    fetchSetLists: () => dispatch(fetchResource('setlist', '', {suffix: false, storeName: 'setlists'})),
    fetchSetList: file => dispatch(fetchResource('setlist/' + file, '', {storeName: 'setlist'})),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(setlist);
