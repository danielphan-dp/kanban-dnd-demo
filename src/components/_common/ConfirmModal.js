import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./ConfirmModal.scss";
import parser from "html-react-parser";

const ConfirmModal = ({ title, content, show, onAction }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={() => onAction("close")}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="h5">{parser(title)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{parser(content)}</Modal.Body>
        <Modal.Footer style={{ padding: "5px" }}>
          <Button
            variant={
              title.toLowerCase() === "delete list" ? "danger" : "primary"
            }
            size="sm"
            onClick={() => onAction("confirm")}
          >
            Proceed
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onAction("close")}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmModal;
