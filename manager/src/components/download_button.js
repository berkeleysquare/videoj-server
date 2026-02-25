import React from "react";
import {connect} from "react-redux";
import DownLoadIcon from "@material-ui/icons/GetApp";
import LaunchIcon from "@material-ui/icons/Launch";
import Button from "@material-ui/core/Button";
import {createResource} from "../common/actions";

const groomVideoJson = (item) => {
  item.copyright = item.copyright != null ? String(item.copyright) : "";
  item.aspectRatio = item.aspectRatio != null ? String(item.aspectRatio) : "1.33";
  // Optionally, remove fields not in AlbumPayload (like _id, error, fetching, etc.)
  delete item._id;
  delete item.error;
  delete item.fetching;
  delete item.collection;
};

const groomAlbumJson = (data) => {
  if (Array.isArray(data.data)) {
      data.data.forEach(item => {
        groomVideoJson(item);
      });
  }
  // Build the AlbumPayload structure
  return {
      title: data.title || "",
      collection: data.collection || "",
      description: data.description || "",
      assets: data.assets || "",
      defaultID: data.defaultID || "",
      media: data.media || "",
      ensembles: Array.isArray(data.ensembles) ? data.ensembles.map(e => ({id: e.id, text: e.text})) : [],
      data: data.data || []
  };
};

  const groomSetlistJson = (data) => {
    if (Array.isArray(data.setList)) {
        data.setList.forEach(item => {
          groomVideoJson(item);
        });
    }
    // Build the SetlistPayload structure
    return {
        setList: data.setList || [],
        setListTitle: data.setListTitle || "Set List"
    };
  }



const downloadDataButton = props => {
  const {obj, title, type, onClick} = props;

  let payload, resource;
  let label = 'Download'
  if (type === 'json') {
    resource = 'upload/collection';
    payload = groomAlbumJson(obj);
  } else if (type === 'setlist') {
    label = 'Download SetList JSON';
    resource = 'upload/setlist';
    payload = groomSetlistJson(obj);
  } else {
    // Download SetList HTML as file
    label = 'SetList HTML';
    const fileName = (encodeURI(title || 'setlist')) + '.html';
    const blobTxt = new Blob([obj], {type: 'text/html;charset=utf-8'});
    const blobURL = URL.createObjectURL(blobTxt);
    return (<>
      <Button color={'info'} onClick={() => window.open(blobURL, '_blank')}>
        <LaunchIcon />
        {'View'}
      </Button>
      {label}
      <a href={blobURL} download={fileName} target="_blank">
        <Button color={'info'}>
          <DownLoadIcon />
          {'Download'}
        </Button>
      </a>
    </>);
  }

  console.log('Prepared payload for download:', payload);

  // for all other types, we use the createResource action
  return (
      <Button color={'info'} onClick={() => onClick(resource, payload)}>
        <DownLoadIcon />
        {label}
      </Button>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onClick: (resource, content) => {
      dispatch(createResource(resource, null, content, {
        onSuccess: () => {
          console.log('Download successful');
        },
        onError: error => {
          console.error('Download failed:', error);
        }
      }))}
  };
};

export default connect(null, mapDispatchToProps)(downloadDataButton);