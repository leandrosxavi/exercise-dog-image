import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      dogObj: undefined,
      dogArray: [],
    };

    // this.fetchDog = this.fetchDog.bind(this);
    this.saveDog = this.saveDog.bind(this);
    this.renderDogElement = this.renderDogElement.bind(this);
  }

  componentDidMount() {
    this.fetchDog();
  }

  async fetchDog() {
    this.setState({ loading: true }, async () => {
      const dogRequest = await fetch('https://dog.ceo/api/breeds/image/random');
      const dogData = await dogRequest.json();
      this.setState({
        dogObj: dogData,
        loading: false,
      });
    });
  }

  saveDog() {
    this.setState(({ dogObj, dogArray }) => ({
      dogArray: [...dogArray, dogObj],
    }));

    this.fetchDog();
  }

  renderDogElement() {
    const { dogObj } = this.state;
    return (
      <div>
        <img src={ dogObj.message } alt="Dog" />
        <input
          type="button"
          value="Gerar doguinho"
          onClick={ this.saveDog }
        />
      </div>
    );
  }

  render() {
    const { loading, dogArray } = this.state;

    return (
      <div className="App">
        <span>
          { dogArray.map((dog, id) => <img key={ id } src={ dog.message } alt="Dog" />) }
        </span>

        { loading ? <span>Loading...</span> : this.renderDogElement() }
      </div>
    );
  }
}

export default App;
