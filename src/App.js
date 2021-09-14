import React from 'react';
import {BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import {initializeApp} from './redux/appReducer';
import Preloader from './components/Common/Preloader/Preloader';
import { compose } from 'redux';
import { Provider } from 'react-redux';
import store from './redux/redux-store';
import { withSuspense } from './hoc/withSuspense';
//import ErrorBoundary from './components/Common/ErrorBoundary/ErrorBoundary';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));


class App extends React.Component {

    catchAllUnhandledErrors = () => {
        console.log('Some error occured!');
    }
    
    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

   render() {

        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (       
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Switch>
                        <Redirect exact from="/" to="/profile" />              
                        <Route path='/profile/:userId?' 
                               render={() => <ProfileContainer/>}/>
                        <Route path='/dialogs' 
                               render={withSuspense(DialogsContainer)}/>
                        <Route path='/users' 
                               render={() => <UsersContainer/>}/>
                        <Route path='/login' 
                               render={() => <Login/>}/>
                        <Route path='/news' component={News}/>
                        <Route path='/music' component={Music}/>
                        <Route path='/settings' component={Settings}/>
                        <Route path='*' 
                               render={() => <div>404 NOT FOUND</div>}/>
                    </Switch>
                </div>        
            </div>           
        );
    }
    
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
});

const AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const SamuraiJSApp = (props) => {
    return (
    <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
    );
};

export default SamuraiJSApp;