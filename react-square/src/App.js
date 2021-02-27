import React from 'react'

class App extends React.Component {
  render() {
    return <div>
      <Animation> </Animation>
    </div>;
  }
}

class Animation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { angle: 0 };
    this.updateAnimationState = this.updateAnimationState.bind(this);
  }

  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }

  updateAnimationState() {
    this.setState(prevState => ({ angle: prevState.angle + 1 }));
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  render() {
    return <Canvas angle={this.state.angle} />
  }
}

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidUpdate() {
    const {angle} = this.props;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    ctx.save();
    ctx.beginPath();
    ctx.clearRect(0, 0, width, height);
    ctx.translate(width/2, height/2 );
    ctx.rotate(angle * Math.PI / 180);
    ctx.fillStyle = '#4397AC';
    ctx.fillRect(-width/4, -height/4, width/2, height/2);
    ctx.restore();
  }

  render() {
    return <canvas width="300" height="300" ref={this.canvasRef}> </canvas>;
  }
}

React.render(<App />, document.getElementById('root'));


export default App;
