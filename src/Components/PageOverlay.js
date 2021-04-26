import { useHistory } from "react-router-dom"
import { useState } from "react"
import OverlayAttribute from "./OverlayAttribute"
import DecorativeLines from "./DecorativeLines"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { AiOutlineEdit } from "react-icons/ai"
import { updatePage } from '../API_calls/calls'
import { typeNumToString, typeStringToNum } from '../Functions/utility'

const PageOverlay = ({ page, pages, setPages }) => {
	const history = useHistory()
	const [ isEditable, setIsEditable ] = useState(false) 
	const [ editedPage, setEditedPage ] = useState({ ...page, type: typeNumToString(page.type) })
	//updated values to be sent if edited. PageType will be stored as a meaningful string for display purposes if not editing.

	return page
		? (
			<div className="formContainer">
				<div className={ "form__title" }>
					<h3 style={ { marginLeft: "20px", whiteSpace: "normal", overflow: "hidden", textOverflow: "ellipsis" } }>{ page.title }</h3>
					<AiOutlineEdit size={ "30" } style={ { marginLeft: "auto", marginRight: "15px", alignSelf: "flex-end", color: "white" } }
						onClick={ () => { setIsEditable(!isEditable) } } />
					<AiOutlineCloseCircle size={ "30px" }
						style={ { justifySelf: "flex-end", alignSelf: "flex-end", marginTop: "5px", } }
						onClick={ () => { history.push("/admin") } } />   {/*TODO wrap in button for accessibility */ }
				</div>
				{ isEditable
					?
					editedPage &&
					<div className="form__content" style={ { paddingTop: "20px", flexGrow: "1", display: "flex", flexDirection: "column" } }>
						<h2 className="form__label">Title</h2>
						<input className="form__input--text" placeholder="Title" value={ editedPage.title } onChange={ (event) =>
						{
							setEditedPage({ ...editedPage, title: event.target.value })
						} } />
						<h2 className="form__label" style={ { marginTop: "10px" } }>Description</h2>
						<textarea className="form__input--text" style={ { height: "80px" } } placeholder="Description" value={ editedPage.description } onChange={ (event) =>
						{
							setEditedPage({ ...editedPage, description: event.target.value })
						} } />  {/**TODO enforce restrictions*/ }

						<h2 className={ "form__label" } style={ { marginTop: "30px", marginBottom: "10px" } }>Type</h2>
						<form className={ "radioForm" }>
							<div className="radioContainer" >
								<input type="radio" value="0" id="Menu"
									defaultChecked={ editedPage.type === "0" || editedPage.type === "Menu" }
									onChange={ (e) => { setEditedPage({ ...editedPage, type: e.target.value }) } } name="Type" />
								<label className={ "radio__label" }>Menu</label>
							</div>

							<div className="radioContainer" >
								<input type="radio" value="1" id="Events"
									defaultChecked={ editedPage.type === "1" || editedPage.type === "Events" }
									onChange={ (e) => { setEditedPage({ ...editedPage, type: e.target.value }) } } name="Type" />
								<label className={ "radio__label" }>Events</label>
							</div>

							<div className="radioContainer">
								<input type="radio" value="2" id="Content"
									defaultChecked={ editedPage.type === "2" || editedPage.type === "Content" }
									onChange={ (e) => { setEditedPage({ ...editedPage, type: e.target.value }) } } name="Type" />
								<label className={ "radio__label" }>Content</label>
							</div>
						</form>

						<button style={ { marginTop: "20px" } } className="saveButton"
							onClick={ async () =>
							{
								try {
									const updatedPage = await updatePage({ ...editedPage, type: typeStringToNum(editedPage.type) })
									setPages(pages.filter((page) => page.id !== updatedPage.id).concat(updatedPage)) //remove old page, add updated
								}
								catch{
									console.log("something failed")  //TODO notification
								}
							}}>
							Save
							</button>
						<DecorativeLines />

					</div>
					:
					<div className={ "form__content" } style={ { paddingTop: "20px" } }>
						<OverlayAttribute attribute={ "Title" } value={ page.title } />
						<OverlayAttribute attribute={ "Description" } value={ page.description } />
						<OverlayAttribute attribute={ "Published on" } value={ page.publishedOn } />
						<OverlayAttribute attribute={ "Type" } value={ typeNumToString(page.type) } />
						<DecorativeLines />
					</div>
				}
			</div>
		)
		: (null) /*invalid url parameter*/
}

export default PageOverlay