import React, { Component } from 'react';
import styled from 'styled-components';
import { Mutation, withApollo, Query } from 'react-apollo';
import { curry, partial, pipe } from 'ramda';
import gql from 'graphql-tag';
import { DragDropContext } from 'react-beautiful-dnd';
import { initialData } from '../utils/userData';
import { GET_VOTELIST, USER_SWAP } from '../graphqlQueries';
import Column from './Column';


const Container = styled.div`
  display: flex;
`;

class Restaurants extends Component {

  state = initialData;

  onDragEnd = updateColumn => result => {
    const { client } = this.props;
    const repository = client.readFragment({
      id: 'VoteList:5bf258131d548c0030969183',
      fragment: gql`
        fragment myVotelist on VoteList {
            id
            columnOrder
            columns {
                id
                userNames {
                    id
                }
                columnName
                title
            }
        }
      `
    });
    const startArray = repository.columns.filter(column => result.source.droppableId === column.id);
    const start = startArray.find(column => result.source.droppableId === column.id);
    const newFinish = repository.columns.filter(column => result.destination.droppableId === column.id);
    const testFinish = newFinish.find(column => result.destination.droppableId === column.id);
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    if (startArray[0].id === newFinish[0].id) {
      const newUserLocation = Array.from(start.userNames);
      const oldLocation = newUserLocation.splice(source.index, 1)
      const foundUser = oldLocation.find(location => location.id === draggableId);
      let users = []
      if (foundUser) {
        newUserLocation.splice(destination.index, 0, foundUser)
        newUserLocation.map((val) => {
          users.push(val.id)
        })
      }

      const input = {
        columnName: newFinish[0].columnName,
        id: newFinish[0].id,
        title: newFinish[0].title,
        userNames: users
      };

      client.writeFragment({
        id: `Column:${start.id}`,
        fragment: gql`
          fragment myVotelist on VoteList {
              id
              columnOrder
              columns {
                  id
                  userNames {
                      id
                  }
                  columnName
                  title
              }
          }
        `,
        data: {
          ...repository,
          columns: {
            ...newFinish[0],
            userNames: newUserLocation
          }
        }
      });

      return updateColumn({ variables: { input } });
    }
    // //moving from one list to another
    const newUserStartLocation = Array.from(start.userNames);
    const oldStartLocation = newUserStartLocation.splice(source.index, 1)
    const foundUserAtOldStart = oldStartLocation.find(location => location.id === draggableId);
    const newUserStart = {
      ...start,
      userNames: newUserStartLocation
    };
    let removeTypeNameStart = [];
    newUserStartLocation.map(val => {
      removeTypeNameStart.push(val.id)
    });

    const startInput = {
      columnName: newUserStart.columnName,
      id: newUserStart.id,
      title: newUserStart.title,
      userNames: removeTypeNameStart,
    }
    updateColumn({ variables: {input: startInput} });

    client.writeFragment({
      id: `Column:${start.id}`,
      fragment: gql`
          fragment myVotelist on VoteList {
              id
              columnOrder
              columns {
                  id
                  userNames {
                      id
                  }
                  columnName
                  title
              }
          }
      `,
      data: {
        ...repository,
        columns: {
          ...newUserStart,
          userNames: newUserStartLocation
        }
      }
    });
    const finishUserLocation = Array.from(testFinish.userNames);
    finishUserLocation.splice(destination.index, 0, foundUserAtOldStart);

    const newUserFinish = {
      ...testFinish,
      userNames: finishUserLocation
    };
    let removeTypeNameFinish =  []
    finishUserLocation.map(val => {
      removeTypeNameFinish.push(val.id)
    })

    const finishInput = {
      columnName: newUserFinish.columnName,
      id: newUserFinish.id,
      title: newUserFinish.title,
      userNames: removeTypeNameFinish
    };

    updateColumn({ variables: {input: finishInput }});

    client.writeFragment({
      id: `Column:${start.id}`,
      fragment: gql`
          fragment myVotelist on VoteList {
              id
              columnOrder
              columns {
                  id
                  userNames {
                      id
                  }
                  columnName
                  title
              }
          }
      `,
      data: {
        ...repository,
        columns: {
          ...newUserFinish,
          userNames: finishUserLocation
        }
      }
    });
    return
  };

  render() {
    return (
      <Mutation
        mutation={USER_SWAP}
      >
        {(updateColumn) => (
          <DragDropContext
            onDragStart={this.onDragStart}
            onDragUpdate={this.onDragUpdate}
            onDragEnd={this.onDragEnd(updateColumn)}
          >
            <Container>
              <Query
                query={GET_VOTELIST}
                variables={{ id: '5bf258131d548c0030969183' }}
              >
                {(props) => {
                  const { data, loading } = props;
                  console.log(props);
                  if (loading) {
                    return (
                      <div>Loading</div>
                    )
                  }
                  return data.getVoteList.columns.map(columns => {
                    const column = columns
                    const tasks = column.userNames.map(user => user)
                    return <Column key={columns.id} column={column} tasks={tasks} />
                  });
                }}
              </Query>
            </Container>
          </DragDropContext>
        )}
      </Mutation>
    )}
}

export default withApollo(Restaurants);



// onDragStart = () => {
//   document.body.style.color = 'orange';
//   document.body.style.transition = 'background-color 0.2s ease';
// }
//
// onDragUpdate = update => {
//   const { destination } = update;
//   const opacity = destination
//     ? destination.index / Object.keys(this.state.tasks).length
//     : 0;
//   document.body.style.backgroundColor = `rgba( 153, 141, 217, ${opacity})`;
// };


// function Restaurants() {
//   const [taskData, setTaskData] = useState(initialData);
//
//   const onDragEnd = result => {
//     console.log(result)
//   }
//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       {taskData.columnOrder.map((columnId) => {
//         const column = taskData.columns[columnId];
//         const tasks = column.taskIds.map(taskId => taskData.tasks[taskId]);
//         return <Column key={column.id} column={column} tasks={tasks} />
//       })}
//     </DragDropContext>
//   )
// }

// const start = this.state.columns[source.droppableId];
// const finish = this.state.columns[destination.droppableId];
// //
// // if (start === finish) {
// //   console.log('ready to start', start)
// //   const newTaskIds = Array.from(start.taskIds);
// //   console.log('new tasks', newTaskIds)
// //   newTaskIds.splice(source.index, 1);
// //   newTaskIds.splice(destination.index, 0, draggableId);
// //
// //   const newColumn = {
// //     ...start,
// //     taskIds: newTaskIds,
// //   };
// //
// //   const newState = {
// //     ...this.state,
// //     columns: {
// //       ...this.state.columns,
// //       [newColumn.id]: newColumn
// //     },
// //   };
// //   this.setState(newState);
// //   return;
// // }
