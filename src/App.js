import React, { Component } from 'react';

import World from './features/world';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ height: window.innerHeight });
  }

  render() {
    const { height } = this.state;

    return (
      <div className='game-layout-container'>
        {
          (height < 800) ?
            null
            :
            <span className='game-title-text'>
              {'React + Redux RPG'}
            </span>
        }
        <World />
      </div>
    );
  }
}

export default App;
