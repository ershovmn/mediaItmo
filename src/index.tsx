import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Switch, Route } from 'react-router-dom'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'

const Home =  React.lazy(() => import('./Components/Home/Home'))
const Album = React.lazy(() => import('./Components/Album/Album'))

document.body.style.backgroundColor = '#3d3d3d'

ReactDOM.render(
    <React.StrictMode>
        <Suspense fallback={<div className='loader'></div>}>
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/album/:id' component={Album} />
            </Switch>
        </BrowserRouter>
        </Suspense>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
