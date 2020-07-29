import React from 'react'
import Game from './Game'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPaneOpen: false,
            isPaneOpenLeft: false,
        };
    }

    render() {
        return(
            <div className="container">

                <Game />
                
            </div>
        );
    }
}

export default App;