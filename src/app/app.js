import React, { Component } from 'react';
import { render } from 'react-dom';

import Nav from './components/nav';
import ContainerTask from './components/containerTask';

class App extends Component {
    render() {
        return (
            <div>
                <Nav />

                <ContainerTask />
            </div>
        )
    }

}
export default App;