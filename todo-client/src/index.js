import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import { store, history } from './store';

ReactDOM.render((
<Provider store={store}>
    <App history={history} />
</Provider>), document.getElementById('root'));
