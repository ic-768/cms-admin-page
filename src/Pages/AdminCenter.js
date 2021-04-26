import { useState, useEffect } from "react"
import { Route, useLocation } from "react-router-dom"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

import PageCard from "../Components/PageCard"
import PageOverlay from "../Components/PageOverlay"
import NewOverlay from "../Components/NewOverlay"
import Banner from '../Components/Banner'
import { updatePage } from "../API_calls/calls"

const AdminCenter = ({ setPages, pages }) =>
{ 
	const [ focusedPageID, setFocusedPageID ] = useState(null) //page to view or edit
	const [ filterQuery, setFilterQuery ] = useState("")
	const [ filteredResults, setFilteredResults ] = useState(pages) //which pages to show

	const currPath = useLocation()

	console.log(filteredResults)

	useEffect(() =>
	{ //get ID parameter from url
		setFocusedPageID(
			currPath.pathname.match(/.*\/(\d+)/)
				? parseInt(currPath.pathname.match(/.*\/(\d+)/)[ 1 ]) || null //
				: null
		)
	}, [ currPath ])

	useEffect(() =>
	{
		pages && setFilteredResults(filterPages(pages, filterQuery))// show page only if query contained in the title 
	}, [ pages, filterQuery ])

	const filterPages = (pages, query) => // filter by title and description
		pages.filter((page) => page.title.toLowerCase().includes(query.toLowerCase()) || 
			page.description.toLowerCase().includes(query.toLowerCase())) 

	return (
		<>
			<Banner filterQuery={ filterQuery } setFilterQuery={ setFilterQuery } username="Ioannis"/> 
			<div className="PageContainer" style={{ display: "flex"}}>
				<div className="PageContent"style={ { flexGrow: "1", display: "flex", justifyContent:"center",alignItems: "center", flexDirection: "column" } }>
					<div className="dropZoneRow"style={ { width:"100%",display: "flex",justifyContent:"center" } }> 
						<DragDropContext
							onDragEnd={ async (result) =>
							{
								if (!result.destination) { return }  // dragged outside valid areas
								const draggedId = result.draggableId.match(/\d+/)[ 0 ] // item id
								const targetPage = pages.filter((page) => page.id === parseInt(draggedId))[ 0 ]
								const itemActivity = result.draggableId.match(/\d+ (.*)/)[ 1 ] // item currently active or inactive
								const destActivity = result.destination.droppableId // area dragged to

								if (itemActivity === "active" && destActivity === "inactive")
								{ // set inactive
									try
									{
										const updatedPage = await updatePage({ ...targetPage, isActive: false })
										setPages((pages.filter((page) => page.id !== parseInt(draggedId)).concat(updatedPage)))
									}
									catch{
										console.log("error") // TODO notifications
									}
								}
								else if (itemActivity === "inactive" && destActivity === "active")
								{ //set active
									try
									{
										const updatedPage = await updatePage({ ...targetPage, isActive: true })
										setPages((pages.filter((page) => page.id !== parseInt(draggedId)).concat(updatedPage)))
									}
									catch{
										console.log("error") // TODO notifications
									}
								}
								return
							} }>

							{/*area for active pages */ }
							<Droppable droppableId={ "active" }>
								{ (provided, snapshot) =>
								{
									return (
										<div className="dragArea--active" style={ {
											border: snapshot.isDraggingOver 
											? "1px solid green"
											: "1px solid white",
											margin: "15px",
											flexWrap: "wrap", display: "flex", borderRadius: "10px",
											minHeight: "500px", width: "45%", justifyContent: "center",
										} }
											{ ...provided.droppableProps }
											ref={ provided.innerRef }
										>
											{ filteredResults && filteredResults.map((page, i) => //TODO there's definitely a way to optimise the sorting 
											{
												return <Draggable key={ page.id.toString() } draggableId={ `${page.id.toString()} active` } index={ i }>
													{ (provided) =>
														<div
															ref={ provided.innerRef }
															{ ...provided.draggableProps }
															{ ...provided.dragHandleProps } >
															{ page.isActive && <PageCard page={ page } pages={ page } setPages={ setPages }
																key={ `${page.id.toString()}${i}` } /> }
														</div>
													}
												</Draggable>
											}
											) }
											{ provided.placeholder }
										</div>
									)
								} }
							</Droppable>
							{/*area for inactive pages */ }

							<Droppable droppableId={ "inactive" }>
								{ (provided,snapshot) =>
								{
									return (
										<div className="dragArea--inactive" style={ {
											border: snapshot.isDraggingOver
											?"1px solid red"
											:"1px dashed gray",
											margin: "15px",
											flexWrap: "wrap", display: "flex", borderRadius: "10px",
											minHeight: "500px", width: "45%", justifyContent: "center"
										} }
											{ ...provided.droppableProps }
											ref={ provided.innerRef }
										>
											{ filteredResults && filteredResults.map((page, i) =>
											{//TODO there's definitely a way to optimise the sorting 
												return <Draggable key={ page.id.toString() } draggableId={ `${page.id.toString()} inactive` } index={ i }>
													{ (provided) =>
													{
														return (
															<div
																ref={ provided.innerRef }
																{ ...provided.draggableProps }
																{ ...provided.dragHandleProps } >
																{ !page.isActive && <PageCard page={ page } pages={ page } setPages={ setPages }
																	key={ `${page.id.toString()}${i}` } /> }
															</div>
														)
													} }
												</Draggable>
											}
											) }
											{ provided.placeholder }
										</div>
									)
								} }
							</Droppable>
						</DragDropContext>
					</div>
				</div>

				<Route path="/admin/new"> {/*add new page */ }
					<NewOverlay setPages={ setPages } />
				</Route>

				<Route path="/admin/:id"> {/*view / edit page*/ }
					{
						pages && focusedPageID &&
						<PageOverlay page={ pages.filter((page) => page.id === focusedPageID)[ 0 ] }
							pages={ pages } setPages={ setPages }
						/>
					}
				</Route>
			</div>
		</>
	)
}
export default AdminCenter 