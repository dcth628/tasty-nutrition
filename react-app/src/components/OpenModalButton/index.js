import React from 'react';
import { useModal } from '../../context/Modal';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  if (buttonText === 'Delete Recipe'|| buttonText === 'Delete Cookbook' || buttonText === 'Delete Ingredient') {
    return (<i onClick={onClick} className="fas fa-times" />)
  } else if (buttonText === 'Add to Cookbook') {
    return (<i onClick={onClick} className="fa fa-plus" />)
  } else if (buttonText === 'CREATE INGREDIENT' ||
             buttonText === 'CREATE RECIPE' ||
             buttonText === 'CREATE COOKBOOK' ||
             buttonText === 'EDIT COOKBOOK' ||
             buttonText === 'EDIT RECIPE' ||
             buttonText === 'ADD TO COOKBOOK' ||
             buttonText === 'EDIT INGREDIENT') {
    return (<button onClick={onClick} className='create-buttons'>{buttonText}</button>)
  } else if (buttonText === 'Log In' || buttonText === 'Sign Up') {
    return (<button onClick={onClick} className='dropdown'>{buttonText}</button>)
  } else if (buttonText === 'LOG IN' || buttonText === 'SIGN UP') {
    return (<button onClick={onClick} className='no-border'>{buttonText}</button>)
  } else if (buttonText === 'EDIT REVIEW' || buttonText === 'DELETE REVIEW') {
    return (<button onClick={onClick} className='reviewbtn'>{buttonText}</button>)
  }
  return (
    <button className='ingredient-name' onClick={onClick}>{buttonText}</button>
  );
}

export default OpenModalButton;
