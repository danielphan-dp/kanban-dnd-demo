import React, { useEffect, useRef, useState } from "react";
import "./Column.scss";
import { Button, Dropdown, Form } from "react-bootstrap";
import { Container, Draggable } from "react-smooth-dnd";
import Card from "components/Card/Card";
import ConfirmModal from "../_common/ConfirmModal";
import cloneDeep from "lodash";
import {
  saveContentAfterPressEnter as saveContent,
  selectAllInlineText as selectAll,
} from "utilities/contentEditable";
import { mapOrder } from "utilities/sorts";

const Column = ({ column, onCardDrop, onUpdateColumn }) => {
  // states
  const [columnTitle, setColumnTitle] = useState("");
  const onColumnTitleChange = (e) => setColumnTitle(e.target.value);
  const onColumnTitleBlur = () => onUpdateColumn({ ...column, title: columnTitle }); // prettier-ignore

  const [newCardTitle, setNewCardTitle] = useState("");
  const onNewCardTitleChange = (e) => setNewCardTitle(e.target.value);

  const [formVisible, setFormVisible] = useState(false);
  const toggleAddNewCardForm = () => setFormVisible(!formVisible);

  const [modalVisible, setModalVisible] = useState(false);
  const toggleModalVisibility = () => setModalVisible(!modalVisible);

  const cards = mapOrder(column.cards, column.cardOrder);

  // refs
  const newCardTextareaRef = useRef(null);

  // effects
  useEffect(() => {
    setColumnTitle(column.title);
  }, [column.title]);

  useEffect(() => {
    if (newCardTextareaRef && newCardTextareaRef.current) {
      newCardTextareaRef.current.focus();
    }
  }, [formVisible]);

  const onConfirmModalAction = (actionType) => {
    switch (actionType) {
      case "close":
        return setModalVisible(false);
      case "confirm":
        const newColumn = {
          ...column,
          _destroy: true,
        };
        onUpdateColumn(newColumn);
        return setModalVisible(false);
      default:
        return setModalVisible(false);
    }
  };

  const addNewCard = () => {
    if (!newCardTitle) {
      newCardTextareaRef.current.focus();
      return;
    }
    const newCardToAdd = {
      id: Math.random().toString(36).substring(2, 5),
      boardId: column.boardId,
      columnId: column.id,
      title: newCardTitle.trim(),
      cover: null,
    };
    console.log(column);
    const newColumn = cloneDeep({
      ...column,
      cardOrder: [...column.cardOrder, newCardToAdd.id],
      cards: [...column.cards, newCardToAdd],
    });
    console.log(newColumn);
    onUpdateColumn(newColumn.__wrapped__);
    setNewCardTitle("");
    toggleAddNewCardForm();
  };

  // RENDER COLUMN
  return (
    <div className="column">
      {/* column header */}
      <header className="column-drag-handle">
        <div className="column-title">
          <Form.Control
            className="column-title-editable"
            style={{ width: "85%" }}
            size="sm"
            type="text"
            value={columnTitle}
            onClick={selectAll}
            onMouseDown={(e) => e.preventDefault()}
            onChange={onColumnTitleChange}
            onBlur={onColumnTitleBlur}
            onKeyDown={saveContent}
          />
        </div>
        <div className="column-dropdown-actions">
          <Dropdown>
            <Dropdown.Toggle
              className="dropdown-btn"
              variant="secondary"
              id="dropdown-basic"
              size="sm"
            />
            <Dropdown.Menu className="dropdown-menu-right">
              <Dropdown.Item onClick={toggleAddNewCardForm}>
                Add Card...
              </Dropdown.Item>
              <Dropdown.Item onClick={toggleModalVisibility}>
                Delete List...
              </Dropdown.Item>
              <Dropdown.Item>Move Cards... (beta)</Dropdown.Item>
              <Dropdown.Item>Archive Cards... (beta)</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>

      {/* container where all cards are rendered */}
      <div className="card-list">
        <Container
          groupName="columns"
          onDrop={(dropResult) => onCardDrop(column.id, dropResult)}
          getChildPayload={(index) => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: "card-drop-preview",
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card} />
            </Draggable>
          ))}
        </Container>

        {formVisible && (
          <div className="add-new-card-area">
            <Form.Control
              className="textarea-enter-new-card"
              size="sm"
              as="textarea"
              placeholder="Enter card title..."
              rows={3}
              ref={newCardTextareaRef}
              value={newCardTitle}
              onChange={onNewCardTitleChange}
              onKeyDown={(e) => e.key === "Enter" && addNewCard()}
            />
            {/* prettier-ignore */}
            <Button variant="success" size="sm" onClick={addNewCard}>Add card</Button>
            {/* prettier-ignore */}
            <Button variant="secondary" size="sm" onClick={toggleAddNewCardForm}>Cancel</Button>
          </div>
        )}
      </div>

      {/* footer */}
      {!formVisible && (
        <footer>
          <div className="footer-actions" onClick={toggleAddNewCardForm}>
            <i className="fa fa-plus footer-icon" />
            Add another card
          </div>
        </footer>
      )}

      {/* modal only visible when there are important changes */}
      <ConfirmModal
        title="Delete List"
        show={modalVisible}
        content={`All of your progress of <strong>${column.title}</strong> 
           will be <strong>permanently</strong> deleted. Do you still want to proceed?`}
        onAction={onConfirmModalAction}
        onClose={toggleModalVisibility}
      />
    </div>
  );
};

export default Column;
