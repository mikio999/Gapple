'use client';

import React from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';

const initialItems = [
  { id: 'item-1', content: 'Draggable1' },
  { id: 'item-2', content: 'Draggable2' },
  { id: 'item-3', content: 'Draggable3' },
];

export default function Page() {
  const [items, setItems] = React.useState(initialItems);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = [...items];
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    setItems(reorderedItems);
  };

  return (
    <div className={'bg-blue-100 px-8 py-4'}>
      <div className={'m-2'}>DragDropContext</div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`mb-4 p-4 border-slate-300 shadow-sm bg-violet-100 border-2`}
            >
              <div className={'m-2'}>Droppable</div>
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-4 border-2 rounded mb-2 bg-pink-100 w-48 flex justify-center border-slate-300"
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
