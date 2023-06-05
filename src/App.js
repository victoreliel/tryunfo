import React from 'react';
import './App.css';
import Form from './components/Form';
import Card from './components/Card';

const INITIAL_STATE = {
  cardName: '',
  cardDescription: '',
  cardAttr1: '0',
  cardAttr2: '0',
  cardAttr3: '0',
  cardImage: '',
  cardRare: '',
  cardTrunfo: false,
  hasTrunfo: false,
  isSaveButtonDisabled: true,
  cardList: [],
};

class App extends React.Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
  }

  manageSaveButton = () => {
    const {
      cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3,
    } = this.state;
    const attrLimit = 90;
    const totalAttrLimit = 210;
    const attr1 = parseInt(cardAttr1, 10);
    const attr2 = parseInt(cardAttr2, 10);
    const attr3 = parseInt(cardAttr3, 10);

    if (cardName.length > 0
      && cardDescription.length > 0
      && cardImage.length > 0
      && cardRare.length > 0) {
      this.setState({ isSaveButtonDisabled: false });
    } else this.setState({ isSaveButtonDisabled: true });

    if (attr1 > attrLimit || attr1 < 0) {
      this.setState({ isSaveButtonDisabled: true });
    }
    if (attr2 > attrLimit || attr2 < 0) {
      this.setState({ isSaveButtonDisabled: true });
    }
    if (attr3 > attrLimit || attr3 < 0) {
      this.setState({ isSaveButtonDisabled: true });
    }
    if (attr1 + attr2 + attr3 > totalAttrLimit) {
      this.setState({ isSaveButtonDisabled: true });
    }
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, this.manageSaveButton);
  }

  onSaveButtonClick = (target) => {
    target.preventDefault();
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      cardList,
      hasTrunfo,
    } = this.state;

    if (cardTrunfo === true) this.setState({ hasTrunfo: cardTrunfo });
    const createCard = {
      name: cardName,
      descripton: cardDescription,
      attr1: cardAttr1,
      attr2: cardAttr2,
      attr3: cardAttr3,
      image: cardImage,
      rare: cardRare,
      hasTrunfo: cardTrunfo,
    };

    this.setState({
      cardList: [...cardList, createCard],
      cardName: '',
      cardDescription: '',
      cardImage: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardRare: 'normal',
      cardTrunfo: hasTrunfo,
    });
  }

  deleteCard = ({ target }) => {
    const { cardList } = this.state;
    const { hasTrunfo } = cardList.find((card) => card.name);
    const filterCard = cardList.filter((card) => card.name !== target.id);
    this.setState({ cardList: filterCard });
    if (hasTrunfo) this.setState({ hasTrunfo: false });
  }

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      isSaveButtonDisabled,
      hasTrunfo,
      cardList,
    } = this.state;
    return (
      <>
        <div className="main-container">
          <div className="form-container">
            <h1>Tryunfo</h1>
            <Form
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardImage={ cardImage }
              cardRare={ cardRare }
              cardTrunfo={ cardTrunfo }
              onInputChange={ this.onInputChange }
              isSaveButtonDisabled={ isSaveButtonDisabled }
              onSaveButtonClick={ this.onSaveButtonClick }
              hasTrunfo={ hasTrunfo }
            />
          </div>
          <div className="card-container">
            <Card
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardImage={ cardImage }
              cardRare={ cardRare }
              cardTrunfo={ cardTrunfo }
              onInputChange={ this.onInputChange }
            />
          </div>
        </div>
        <div className="division" />
        <div className="all-cards">
          <h2>Todas as cartas</h2>
          <div className="cards-display">
            { cardList.map((card, index) => (
              <div key={ index } className="card-btn">
                <Card
                  key={ card.name }
                  cardName={ card.name }
                  cardDescription={ card.descripton }
                  cardAttr1={ card.attr1 }
                  cardAttr2={ card.attr2 }
                  cardAttr3={ card.attr3 }
                  cardImage={ card.image }
                  cardRare={ card.rare }
                  cardTrunfo={ card.hasTrunfo }
                  onInputChange={ this.onInputChange }
                  deleteCard={ this.deleteCard }
                />
                <button
                  id={ card.name }
                  type="button"
                  data-testid="delete-button"
                  onClick={ this.deleteCard }
                >
                  Excluir carta
                </button>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default App;
