import React, {useState} from "react";
import {connect} from 'react-redux';
import Typography from '@material-ui/core/Typography';
import {AppBar, InputLabel, Tab, Tabs} from "@material-ui/core";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import {fetchResource} from "./common/actions";
import AlbumDisplay from './album_display';
import SetlistEditor from './setlist';

const EDITOR = 'edit';
const SETLIST = 'setlist';


const mainDisplay = props => {
  const {albums, name, fetchAlbum} = props;

  const [album, setAlbum] = useState('');
  const [tool, setTool] = useState(EDITOR);

  const handleToolChange = (event, value) => {
    setTool(value);
  };

  const handleAlbumChange = event => {
    setAlbum(event.target.value);
    fetchAlbum(event.target.value);
  }

  const albumOptions = albums
    ? albums.map((e,i) => {
      return (<MenuItem key={'album_' + i} value={e.collection}>{e.title}</MenuItem>)
    }) : [];



    return (
      <div className="App">
        <Paper elevation={2}>
          <Typography variant={'h3'}>{name}</Typography>
          <br/>
          <form>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <InputLabel shrink={true}>Album/Collection</InputLabel>
                <Select label={'Album'}
                        onChange={handleAlbumChange}>
                  {albumOptions}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <AppBar position="static" color="default">
                  <Tabs
                    value={tool}
                    onChange={handleToolChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                  >
                    <Tab label={EDITOR} value={EDITOR} />
                    <Tab label={SETLIST} value={SETLIST} />
                  </Tabs>
                </AppBar>
                {tool === EDITOR && <AlbumDisplay albums={albums} album={album} />}
                {tool === SETLIST && <SetlistEditor albums={albums} album={album} />}
              </Grid>
            </Grid>
          </form>
        </Paper>
      </div>
    );
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAlbum: album => dispatch(fetchResource('collection/' + album)),
  };
}

export default connect(null, mapDispatchToProps)(mainDisplay);
