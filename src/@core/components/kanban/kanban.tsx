import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Card } from '@mui/material'

const columns = {
  requested: {
    id: 'requested',
    title: 'Requested',
    tasks: []
  },
  inProgress: {
    id: 'inProgress',
    title: 'In Progress',
    tasks: []
  },

  done: {
    id: 'done',
    title: 'Done',
    tasks: []
  }
}

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(columns)

  const handleOnDragEnd = result => {
    if (!result.destination) return

    const { source, destination, draggableId } = result
    if (source.droppableId === destination.droppableId && source.index === destination.index) return

    const sourceColumn = tasks[source.droppableId]
    const destinationColumn = tasks[destination.droppableId]
    const newSourceTasks = Array.from(sourceColumn.tasks)
    const newDestinationTasks = Array.from(destinationColumn.tasks)
    const [draggedTask] = newSourceTasks.splice(source.index, 1)
    newDestinationTasks.splice(destination.index, 0, draggedTask)

    const newTasks = {
      ...tasks,
      [sourceColumn.id]: { ...sourceColumn, tasks: newSourceTasks },
      [destinationColumn.id]: { ...destinationColumn, tasks: newDestinationTasks }
    }

    setTasks(newTasks)
  }

  const handleNewTaskSubmit = (event, columnId) => {
    event.preventDefault()
    const input = event.target.elements.task
    const newTaskContent = input.value.trim()
    if (!newTaskContent) return
    const newTask = { id: `task-${Date.now()}`, content: newTaskContent }
    const column = tasks[columnId]
    const newTasks = { ...tasks, [columnId]: { ...column, tasks: [...column.tasks, newTask] } }
    setTasks(newTasks)
    input.value = ''
  }

  const handleTaskDelete = (taskId, columnId) => {
    const column = tasks[columnId]
    const filteredTasks = column.tasks.filter(task => task.id !== taskId)
    const newTasks = { ...tasks, [columnId]: { ...column, tasks: filteredTasks } }
    setTasks(newTasks)
  }

  return (
    <Card sx={{ padding: 8 }}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className='flex justify-center pt-8'>
          {Object.values(tasks).map(column => (
            <div className='w-72 mr-4' key={column.id}>
              <h2 className='text-lg font-bold mb-4'>{column.title}</h2>
              <Droppable droppableId={column.id}>
                {provided => (
                  <div className='p-2 bg-white rounded shadow-sm' {...provided.droppableProps} ref={provided.innerRef}>
                    {column.tasks.map(({ id, content }, index) => (
                      <Draggable key={id} draggableId={id} index={index}>
                        {provided => (
                          <div
                            className='mb-2 p-2 bg-gray-100 rounded shadow-sm'
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <div className='text-sm'>{content}</div>
                            <button
                              className='ml-auto text-red-500 hover:text-red-700'
                              onClick={() => handleTaskDelete(id, column.id)}
                            >
                              X
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <form className='mt-4' onSubmit={e => handleNewTaskSubmit(e, column.id)}>
                <input
                  className='w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  type='text'
                  name='task'
                  placeholder='Add a new task...'
                />
                <button
                  className='w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  type='submit'
                >
                  Add
                </button>
              </form>
            </div>
          ))}
        </div>
      </DragDropContext>
    </Card>
  )
}
export default KanbanBoard
