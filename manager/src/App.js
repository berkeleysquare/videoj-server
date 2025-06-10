import React from "react";
import MainDisplay from "./main_display";

import {COLLECTIONS, DEFAULT_COLLECTION, MANAGER_TITLE} from './common/constants'

import {Provider} from 'react-redux';

import configureStore from './common/store'

function App() {

  return (
    <Provider store={configureStore({'resources': {}})}>
      <MainDisplay name={MANAGER_TITLE}
                    albums={COLLECTIONS}
                    defaultCollection={DEFAULT_COLLECTION}/>
    </Provider>
  );
};

export default App;

