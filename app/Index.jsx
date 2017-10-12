import React            from 'react';
import { render }       from 'react-dom';
import {
    Router,
    Route,
    browserHistory,
}        from 'react-router';
import 'whatwg-fetch';
import App              from 'components/App.jsx';



render(
    <Router
        history={ browserHistory }
    >
        <Route
            path="/"
            component={ App }
            history={ browserHistory }
        />
    </Router>
    , document.getElementById( 'app' ) );
