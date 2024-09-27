import { useState } from "react";
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { StyledModalOverlay, StyledModalWrapper, StyledModalHeader, StyledModal, StyledModalCloseButton, 
  StyledModalBody } from "./setModalStyle";

const useModal = () => {
  // [1] state (état, données)
  const [isShowing, setIsShowing] = useState(false);
  // [2] comportements
  function toggle() {
    setIsShowing(!isShowing);
  }
  // [3] affichage (render et rerender)
  return {
    isShowing,
    toggle
  };
};
export {useModal};

const Modal = ({ isShowing, hide, title, ...props }) =>
  isShowing
    ? ReactDOM.createPortal(
        <>
          <StyledModalOverlay>
            <StyledModalWrapper>
              <StyledModal>
                <StyledModalHeader>
                  <h2>{title}</h2>
                  <StyledModalCloseButton type="button" onClick={hide}>
                    <span>&times;</span>
                  </StyledModalCloseButton>
                </StyledModalHeader>
                <StyledModalBody>{props.children}</StyledModalBody>
              </StyledModal>
            </StyledModalWrapper>
          </StyledModalOverlay>
        </>,
        document.body
      )
    : null;

Modal.propTypes = {
  isShowing: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export { Modal };