import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;w
  padding: 8px;
  margin-bottom: 8px;
  display: flex;
  // background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`;

const Handle = styled.div`
  width: 20px;
  height: 20px
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
`;
class Task extends Component {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {/*if we pass provided.dragHandle Props to Handle, this will cause dragging allowed only from this section*/}
            <Handle />
            {this.props.task.title}
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Task;

