import {Draggable, Droppable} from "react-beautiful-dnd"
import PageCard from "./PageCard"

const DropZone = ({setConfirmation, setNotification, droppableId, pages, setPages, filteredResults}) => {
	/*Dropzones for user to drag pages to and set active or inactive. Since there are only two dropzones,
	droppableIds will either be "active" or "inactive" */

	const activeBorderColor = droppableId === "active" //dynamic border colors
		? "2px solid green"
		: "2px solid red"

	const inactiveBorderColor = droppableId === "active"
		? "2px solid white"
		: "2px dashed gray"

	return (
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <div
          className="dragArea"
          style={{
            border: snapshot.isDraggingOver ? activeBorderColor : inactiveBorderColor,
          }}
          {...provided.droppableProps}
          ref={provided.innerRef}>
          {filteredResults &&
            filteredResults.map(( page, i ) => ( //for each page, create a draggable pagecard
              //TODO there's definitely a way to optimise the sorting - now it's just iterating over ALL pages TWICE
              <Draggable key={page.id.toString()} draggableId={`${page.id.toString()} ${droppableId}`} index={i}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    {droppableId === "active" && page.isActive && (
                      <PageCard
                        setConfirmation={setConfirmation}
                        setNotification={setNotification}
                        page={page}
                        pages={pages}
                        setPages={setPages}
                        key={`${page.id.toString()}${i}`}
                      />
                    )}
                    {droppableId === "inactive" && !page.isActive && (
                      <PageCard
                        setConfirmation={setConfirmation}
                        setNotification={setNotification}
                        page={page}
                        pages={pages}
                        setPages={setPages}
                        key={`${page.id.toString()}${i}`}
                      />
                    )}
                  </div>
                )}
              </Draggable>
            ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default DropZone