import React, { ReactNode, useEffect } from "react";
import Modal from "react-modal";

export const MODAL_ANIMATION_SPEED = 300;

export interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  showCloseButton?: boolean;
  closeButtonLabel?: string;
  header?: string | React.ReactElement;
  backdropBg?: string;
  onRequestClose?: Modal.Props["onRequestClose"];
  onAfterClose?: Modal.Props["onAfterClose"];
  contentStyles?: Modal.Styles["content"];
  overlayStyles?: Modal.Styles["overlay"];
  contentLabel?: string;
}

export const customStyles: Modal.Styles = {
  content: {
    padding: "40px",
    border: "0",
    borderRadius: "8px",
    background: "#FFFFFF",
    width: "fit-content",
    height: "fit-content",
    overflow: "auto",
    overflowX: "hidden",
    maxWidth: "100vw",
    inset: "auto",
  },
  overlay: {
    overflow: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "21",
    background: "rgba(0,0,0,0.5)",
  },
};

const defaultFunction = () => null;

const CustomModal: React.FC<ModalProps> = ({
  isOpen,
  children,
  onRequestClose = defaultFunction,
  onAfterClose = defaultFunction,
  contentLabel,
  contentStyles = {},
  overlayStyles = {},
}) => {
  useEffect(() => {
    Modal.setAppElement(document.body);
  }, []);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        onAfterClose={onAfterClose}
        closeTimeoutMS={MODAL_ANIMATION_SPEED}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        portalClassName="BMCModalComponent"
        contentLabel={contentLabel}
        style={{
          content: { ...customStyles.content, ...contentStyles },
          overlay: { ...customStyles.overlay, ...overlayStyles },
        }}
      >
        {children}
      </Modal>
    </>
  );
};

export default CustomModal;
