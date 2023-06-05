import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BsImage } from 'react-icons/bs';

class Form extends Component {
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
      onInputChange,
      isSaveButtonDisabled,
      onSaveButtonClick,
      hasTrunfo,
    } = this.props;
    const total = 210;

    return (
      <form>
        <h2>Adicionar nova carta</h2>
        <label htmlFor="cardName">
          <span>Nome</span>
          <input
            type="text"
            data-testid="name-input"
            name="cardName"
            id="name-input"
            placeholder="Nome da carta"
            value={ cardName }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="cardDescription">
          <span>Descrição</span>
          <textarea
            name="cardDescription"
            data-testid="description-input"
            id="description-input"
            value={ cardDescription }
            onChange={ onInputChange }
          />
        </label>
        <label className="attr-label" htmlFor="cardAttr1">
          <span>Attr1</span>
          <input
            type="number"
            data-testid="attr1-input"
            name="cardAttr1"
            id="attr1-input"
            value={ cardAttr1 }
            onChange={ onInputChange }
          />
        </label>
        <label className="attr-label" htmlFor="cardAttr2">
          <span>Attr2</span>
          <input
            type="number"
            data-testid="attr2-input"
            name="cardAttr2"
            id="attr2-input"
            value={ cardAttr2 }
            onChange={ onInputChange }
          />
        </label>
        <label className="attr-label" htmlFor="cardAttr3">
          <span>Attr3</span>
          <input
            type="number"
            data-testid="attr3-input"
            name="cardAttr3"
            id="attr3-input"
            value={ cardAttr3 }
            onChange={ onInputChange }
          />
        </label>
        <div className="points-left">
          <p>
            Pontos sobrando:
            {
              total - (Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3))
            }
          </p>
        </div>
        <label htmlFor="cardImage">
          <span>Imagem</span>
          <div className="image-container">
            <BsImage className="img-icon" />
            <input
              type="text"
              data-testid="image-input"
              name="cardImage"
              id="image-input"
              className="image-input"
              value={ cardImage }
              onChange={ onInputChange }
            />
          </div>
        </label>
        <label htmlFor="cardRare">
          <span>Raridade</span>
          <select
            data-testid="rare-input"
            name="cardRare"
            className="select-list"
            id="rare-input"
            value={ cardRare }
            onChange={ onInputChange }
          >
            <option value="normal">Normal</option>
            <option value="raro">Raro</option>
            <option value="muito raro">Muito raro</option>
          </select>
        </label>
        { hasTrunfo
          ? <p className="super-trunfo">Você já tem um Super Trunfo em seu baralho</p>
          : (
            <label htmlFor="cardTrunfo">
              <span className="super-trunfo">Super Tryunfo</span>
              <input
                data-testid="trunfo-input"
                name="cardTrunfo"
                type="checkbox"
                checked={ cardTrunfo }
                onChange={ onInputChange }
              />
            </label>
          )}
        <div className="button-container">
          <button
            type="submit"
            className="save-button"
            data-testid="save-button"
            disabled={ isSaveButtonDisabled }
            onClick={ onSaveButtonClick }
          >
            Salvar
          </button>
        </div>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  cardAttr3: PropTypes.string,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
  isSaveButtonDisabled: PropTypes.bool,
  onInputChange: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
  hasTrunfo: PropTypes.bool,
}.isRequired;

export default Form;
