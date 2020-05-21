import React, { useContext } from 'react';
import './App.css';
import TopBar from './components/TopBar';
import ControlPanel from './components/ControlPanel';
import { Container } from 'semantic-ui-react';
import Instructions from './components/Instructions';
import { LoginContext } from './services/LoginContext';
import Providers from './components/Providers';

const App2 = () => {
    const { isLoggedIn } = useContext(LoginContext);

    return (
        <React.Fragment>
            <TopBar />
            <Container text={!isLoggedIn}>
                {isLoggedIn ? <ControlPanel /> : <Instructions />}
            </Container>
        </React.Fragment>
    );
};

const App = () => (
    <Providers>
        <App2 />
    </Providers>
);
export default App;
