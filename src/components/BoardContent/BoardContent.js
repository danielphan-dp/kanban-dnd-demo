import React, { useState, useEffect, useRef } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import Form from "react-bootstrap/Form";
import { isEmpty } from "lodash";
import "./BoardContent.scss";
import Column from "components/Column/Column";
import { sampleData } from "actions/sampleData";
import { mapOrder } from "utilities/sorts";
import { applyDrag } from "utilities/dragDrop";
import {
  Container as BootstrapContainer,
  Row,
  Col,
  Button,
} from "react-bootstrap";

const BoardContent = () => {
  // states
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const toggleAddNewColumnForm = () => {
    setFormVisible(!formVisible);
    setNewColumnTitle("");
  };
  // refs

  const newColumnInputRef = useRef(null);
  // callbacks

  const [newColumnTitle, setNewColumnTitle] = useState("");
  const onNewColumnTitleChange = (e) => setNewColumnTitle(e.target.value);

  useEffect(() => {
    const boardFromDB = sampleData.boards.find(
      (board) => board.id === "board-1"
    );
    if (boardFromDB) {
      setBoard(boardFromDB);
      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, "id"));
    }
  }, []);

  useEffect(() => {
    if (newColumnInputRef && newColumnInputRef.current) {
      newColumnInputRef.current.focus();
    }
  }, [formVisible]);

  const addNewColumn = () => {
    if (!newColumnTitle) {
      newColumnInputRef.current.focus();
      return;
    }
    const newColumnToAdd = {
      id: Math.random().toString(36).substring(2, 5),
      boardId: board.boardId,
      title: newColumnTitle.trim(),
      cardOrder: [],
      cards: [],
    };
    // create new states
    let newBoard = { ...board };
    let newColumns = [...columns];
    newColumns.push(newColumnToAdd);
    newBoard.columnOrder = newColumns.map((c) => c.id);
    newBoard.columns = newColumns;
    // update new states
    setColumns(newColumns);
    setBoard(newBoard);
    // clear input form
    setFormVisible(!formVisible);
    setNewColumnTitle("");
  };

  if (isEmpty(board)) {
    return (
      <div className="not-found" style={{ padding: "10px" }}>
        Board not found!
      </div>
    );
  }
  // const getCardPayload = (columnId, index) => {
  //   return this.state.scene.children.filter((p) => p.id === columnId)[0]
  //     .children[index];
  // };

  const onColumnDrop = (dropResult) => {
    // create copies of the current state
    let newColumns = [...columns];
    let newBoard = { ...board };
    // update the state
    newColumns = applyDrag(newColumns, dropResult);
    newBoard.columnOrder = newColumns.map((c) => c.id);
    newBoard.columns = newColumns;
    // update the state
    setColumns(newColumns);
    setBoard(newBoard);
  };

  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = [...columns];
      let newBoard = { ...board };
      let currentColumn = newColumns.find((c) => c.id === columnId);
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
      currentColumn.cardOrder = currentColumn.cards.map((c) => c.id);
      setColumns(newColumns);
    }
  };

  const onUpdateColumn = (newColumnToUpdate) => {
    const { id: columnId } = newColumnToUpdate;
    let newColumns = [...columns];
    const columnIndex = newColumns.findIndex((i) => i.id === columnId);
    if (newColumnToUpdate._destroy) {
      // remove column
      newColumns.splice(columnIndex, 1);
    } else {
      // update column
      newColumns.splice(columnIndex, 1, newColumnToUpdate);
    }
    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((c) => c.id);
    newBoard.columns = newColumns;
    setColumns(newColumns);
    setBoard(newBoard);
  };

  return (
    <div className="board-content">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        getChildPayload={(index) => columns[index]}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: "column-drop-preview",
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={index}>
            <Column
              column={column}
              onCardDrop={onCardDrop}
              onUpdateColumn={onUpdateColumn}
            />
          </Draggable>
        ))}
      </Container>
      <BootstrapContainer className="trello-container">
        {!formVisible ? (
          <Row>
            <Col className="add-new-column" onClick={toggleAddNewColumnForm}>
              <i className="fa fa-plus footer-icon" />
              Add another list
            </Col>
          </Row>
        ) : (
          <Row>
            <Col className="enter-new-column">
              <Form.Control
                className="input-enter-new-column"
                size="sm"
                type="text"
                placeholder="Enter list title..."
                ref={newColumnInputRef}
                value={newColumnTitle}
                onChange={onNewColumnTitleChange}
                onKeyDown={(e) => e.key === "Enter" && addNewColumn()}
              />
              {/* prettier-ignore */}
              <Button variant="success" size="sm" onClick={addNewColumn}>Add list</Button>
              {/* prettier-ignore */}
              <Button variant="secondary" size="sm" onClick={toggleAddNewColumnForm}>Cancel</Button>
            </Col>
          </Row>
        )}
      </BootstrapContainer>
    </div>
  );
};

export default BoardContent;
