import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dogObj: {
        message: '',
      },
      loading: true,
      dogName: '',
      dogArray: [],
    };

    this.fetchDog = this.fetchDog.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
    this.saveDog = this.saveDog.bind(this);
    this.fetchLastDog = this.fetchLastDog.bind(this);
  }

  componentDidMount() {
    if (localStorage.length > 0) {
      this.fetchLastDog();
    } else {
      this.fetchDog();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.dogObj.message.includes('terrier')) {
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    const { dogObj, dogArray } = this.state;
    if (prevState.dogObj !== dogObj) {
      localStorage.setItem('Url do doguinho', dogObj.message);
      localStorage.setItem('Array de doguinhos', dogArray);
      alert(dogObj.message.split('/')[4]);
    }
  }

  handleEvent({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  fetchLastDog() {
    const lastDog = localStorage.getItem('Url do doguinho');
    this.setState({
      dogObj: { message: lastDog },
      loading: false,
    });
  }

  fetchDog() {
    this.setState({ loading: true });
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((response) => response.json())
      .then((result) => this.setState({
        dogObj: result,
        loading: false,
      }));
  }

  saveDog() {
    const { dogName } = this.state;
    if (dogName !== '') {
      localStorage.setItem('Nome do Doguinho', dogName);
      this.setState((prevState) => ({
        dogArray: [...prevState.dogArray, dogName],
        dogName: '',
      }));
    }
    this.fetchDog();
  }

  clearStorage() {
    localStorage.clear();
  }

  renderLoading() {
    return <span>Carregando novo dog...</span>;
  }

  renderDog() {
    const { dogObj } = this.state;
    const dogBreed = dogObj.message.split('/')[4];
    return <img src={ dogObj.message } alt={ dogBreed } height="300" />;
  }

  render() {
    const { loading, dogName, dogArray } = this.state;

    return (
      <div>
        <h1>Doguinhos</h1>
        { !loading ? this.renderDog() : this.renderLoading() }
        <input
          type="text"
          name="dogName"
          value={ dogName }
          placeholder="Dê nome ao doguinho"
          onChange={ this.handleEvent }
          required
        />
        <input
          type="button"
          value="Novo Dog"
          onClick={ this.saveDog }
        />
        <input
          type="button"
          value="Limpar LocalStorage"
          onClick={ this.clearStorage }
        />
        { dogArray.map((dog, i) => <div key={ i }><span>{ dog }</span></div>) }
      </div>
    );
  }
}

export default App;
