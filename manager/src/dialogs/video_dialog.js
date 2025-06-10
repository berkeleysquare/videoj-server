import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import VideoForm from '../components/video_form';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const {initialValues, album, ensembles, onCollectionChange, isDefault, setDefault, deleteItem, onSubmit} = props;

  const collection = {}; 
  if (!album) {
    return (<div/>);
  }

  const isEdit = true && initialValues && initialValues.title && initialValues.title.length;
  const buttonLabel = isEdit ? initialValues.title : 'New Video';
  let downloadLink = isEdit ? initialValues.media : '';
  let downloadAudioLink = '';
  if (downloadLink && downloadLink.length && !downloadLink.startsWith('Vimeo:') && !downloadLink.startsWith('YouTube:')) {
    downloadLink = album.media + downloadLink;
    downloadAudioLink = downloadLink.replace('mp4', 'mp3');
  }
  let downloadImageLink = isEdit ? initialValues.poster : '';
  if (downloadImageLink && downloadImageLink.length) {
    downloadImageLink = album.assets + downloadImageLink;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {buttonLabel}
      </Button>
      {isEdit && <Button title={'Edit'} onClick={handleClickOpen}>&#x270E;</Button>}
      {isEdit && <Button title={'Delete'} onClick={deleteItem}>&#x2718;</Button>}
      {isEdit && <Button title={'Set as default'} onClick={setDefault}>{isDefault ? <span>&#x2713;</span> : <span>&#x2610;</span>}</Button>}
      {isEdit && <a href={downloadLink} target='_blank'><Button title={'Download Video'}><span>&#x261F;</span></Button></a>}
      {isEdit && <a href={downloadAudioLink} target='_blank'><Button title={'Download Audio'}><span>&#x266B;</span></Button></a>}
      {isEdit && <a href={downloadImageLink} target='_blank'><Button title={'DownloadImage'}><span>&#x2630;</span></Button></a>}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{buttonLabel}</DialogTitle>
        <DialogContent>
          <VideoForm  initialValues={initialValues}
                      ensembles={ensembles}
                      onCollectionChange={onCollectionChange}
                      onSubmit={onSubmit}
                      closeDialog={handleClose}/>
        </DialogContent>
      </Dialog>
    </div>
  );
}
