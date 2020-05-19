import React, { useContext } from 'react';
import './App.css';
import TopBar from './components/TopBar';
import ControlPanel from './components/ControlPanel';
import { Container } from 'semantic-ui-react';
import Instructions from './components/Instructions';
import { LoginContext, LoginProvider } from './services/LoginContext';
import { BotProvider } from './services/BotContext';

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
    <LoginProvider>
        <BotProvider>
            <App2 />
        </BotProvider>
    </LoginProvider>
);
export default App;
