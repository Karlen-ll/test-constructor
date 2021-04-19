import React from 'react';
import ReactDOM from 'react-dom';

import "antd/dist/antd.css";
import 'index.scss';

import Constructor from "components/Constructor";
import reportWebVitals from 'reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <Constructor/>
    </React.StrictMode>,

    document.getElementById('root')
);

reportWebVitals();
