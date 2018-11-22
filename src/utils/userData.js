export const initialData = {
  tasks: {
    'task-1': {
      id: 'task-1',
      content: 'Grace'
    },
    'task-2': {
      id: 'task-2',
      content: 'Terry'
    },
    'task-3': {
      id: 'task-3',
      content: 'Jon'
    },
    'task-4': {
      id: 'task-4',
      content: 'Travis'
    },
    'task-5': {
      id: 'task-5',
      content: 'Kihwan'
    },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Camy\'s',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    "column-2": {
      id: "column-2",
      title: "Sambo\'s",
      taskIds: []
    },
    "column-3": {
      id: "column-3",
      title: "Gogyo\'s",
      taskIds: []
    },
    "column-4": {
      id: "column-4",
      title: "Shift Eatery",
      taskIds: []
    },
    "column-5": {
      id: "column-5",
      title: "Have Food",
      taskIds: []
    }
  },
  columnOrder: ['column-1', "column-2", "column-3", "column-4", "column-5"]
};
