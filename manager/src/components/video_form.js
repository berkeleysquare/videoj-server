import React from 'react';
import {Form, Field} from 'react-final-form';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import {mdiGoogle, mdiWikipedia} from '@mdi/js';
import Icon from '@mdi/react'

import {Picker, TextField, CopyrightField, DateField, NumberField, FileField} from './form_fields'
import {VimeoPrefix, YouTubePrefix} from '../common/constants';

const LinkIcon = path => {
  return (
    <Icon path={path}
          size={1}
          color="primary"/>
  )
}

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

export const wrapIds = vid => {
  let recordedDate = new Date(vid.recorded || '');
  if (!isValidDate(recordedDate)) {
    recordedDate = new Date();
  }
  return {
    ...vid,
    id: parseInt(vid.id),
    recorded: recordedDate.toISOString().substring(0,10)
  };
};

const aspectRatioOptions = [
  {id: '1.77', text: '16:9'},
  {id: '1.33', text: '4:3'},
];

const videoForm = props  => {
  const {initialValues, ensembles, closeDialog, onSubmit } = props;

  // Mutator to set poster name from file chooser
  const setPosterName = ([args, event], state, tools)  => {
    // args is [name, value]
    tools.changeValue(state, "poster", () => (args[1] || {}).name);
  };

  // Mutator to set poster name from file chooser
  const setMediaName = ([args, event], state, tools)  => {
    // args is [name, value]
    tools.changeValue(state, "media", () => (args[1] || {}).name);
  };

  // Mutator to set prefix in media field
  const setMediaPrefix = ([args, event], state, tools)  => {
    // args is [name, value]
    tools.changeValue(state, "media", () => args[1] || '');
  };
  
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      mutators={{setPosterName, setMediaPrefix, setMediaName}}
      render={({ handleSubmit, values, form }) => {
        const title = (values && values.title) ? values.title : '';
        values.posterChooser = ((values.poster || [])[0] || {}).name;

        return(<div>
          <form onSubmit={handleSubmit} noValidate>
            <Picker name={'ensemble'}
                    label={'Ensemble'}
                    items={ensembles}
                    fkey={i => i.id}
                    ftext={i => i.text}
            />
            <TextField name={'title'}
                       label={'Title'}/>
            {(title.length > 0) && <div>
              <a href={'https://www.google.com/search?q=Who%20wrote%20' + encodeURIComponent(title)}
                 target={'_blank'}><IconButton title={'Google It!'}>{LinkIcon(mdiGoogle)}</IconButton></a>
              <a href={'https://en.wikipedia.org/w/index.php?sort=relevance&title=Special:Search&profile=advanced&fulltext=1&ns0=1&search=' + encodeURIComponent(title)}
                 target={'_blank'}><IconButton title={'Search Wikipedia'}>{LinkIcon(mdiWikipedia)}</IconButton></a>
            </div>}
            <NumberField name={'id'}
                         label={'id'}/>
            <br />
            <TextField name={'description'}
                       label={'Description'}
                       multiline={true}/>
            <br />
            <TextField name={'composer'}
                       label={'Composer'}/>
            <br />
            <CopyrightField name={'copyright'}
                            label={'Copyright'}/>
            <br />
            <TextField name={'poster'}
                       label={'Image File'}/>            
            <FileField name={'posterChooser'}
                       label={'Image File'}
                       onChange={e => form.mutators.setPosterName(['', e.target.files[0]])}
                       />
            <br />
            <TextField name={'media'}
                       label={'Media File'}/><br/>
            <FileField name={'mediaChooser'}
                       label={'Media File'}
                       onChange={e => form.mutators.setMediaName(['', e.target.files[0]])}    />      
             | <a href={'#'} onClick={() => form.mutators.setMediaPrefix(['', YouTubePrefix])}>{YouTubePrefix}</a>           
             | <a href={'#'} onClick={() => form.mutators.setMediaPrefix(['', VimeoPrefix])}>{VimeoPrefix}</a>
            <br />
            <Picker name={'aspectRatio'}
              label={'Aspect Ratio'}
              items={aspectRatioOptions}
              fkey={i => i.id}
              ftext={i => i.text}
            />
            <br />

            <DateField name={'recorded'}
                       label={'Recorded Date'}/>
            <br />
            <pre>{JSON.stringify(wrapIds(values), 0, 2)}</pre>
            <br />
            <Button type={'submit'} label={'Submit'}>Save</Button>
            <Button onClick={closeDialog}>Cancel</Button>
          </form></div>
      )}}
    />
)};

export default videoForm;

