import { useHistory,Link } from "react-router-dom"
import { useState} from "react"
import Calendar from "react-calendar"
import DecorativeLines from "./DecorativeLines"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { AiOutlineEdit } from "react-icons/ai"
import { updatePage } from '../Functions/api_calls'
import { typeNumToString, typeStringToNum } from '../Functions/utility'

const PageOverlay = ({ setNotification,page, pages, setPages }) => {
	const history = useHistory()
	const [ isEditable, setIsEditable ] = useState(false) 

	//updated values to be sent if edited. PageType will be stored as a meaningful string for display purposes if not editing. 
	const [ editedPage, setEditedPage ] = useState(page 
		? { ...page, type: typeNumToString(page.type), publishedOn:new Date()} //valid page given, create dummy for editting
		:null //invalid page
		)

	return page //if page is null, will skip body of code and return null
		? (
			<div style={{width:isEditable?"700px":"300px"}} className="formContainer">
				<div className={ "form__title" }>
					<h3 style={{ marginLeft: "20px", whiteSpace: "normal", overflow: "hidden", textOverflow: "ellipsis" }}>{ page.title }</h3>

					<div style={{
						display: "flex", alignItems: "center", marginLeft: "auto", marginRight: "15px", 
						alignSelf: "flex-end", color: "white", height: "100%" }}>
						<AiOutlineEdit style={{marginRight:"18px"}}
							onClick={ () => { setIsEditable(!isEditable) } } size={ "30" } />

						<Link style={{ justifySelf: "flex-end", alignSelf: "flex-end", marginTop: "5px" } } to="/admin" >
							<AiOutlineCloseCircle size={ "30px" } />
						</Link>
					</div>
				</div>
				{ isEditable // page is editable, render inputs etc.
					?
					editedPage &&
					<div className="form__content--edit" style={{ paddingTop: "20px", flexGrow: "1"}}>
						<h2 className="form__label--left">Title *</h2>
						<input maxLength="50" className="form__input--text" placeholder="Title (max 50 chars)" 
						value={ editedPage.title } onChange={(event) => {
							setEditedPage({ ...editedPage, title: event.target.value })}}/> {/*update title*/}
						<h2 className="form__label--left" style={{ marginTop: "10px" }}>Description</h2>
						<div style={{width:"100%"}}>
							<textarea className="form__input--text" maxLength="200" style={{ height: "80px" }} 
								placeholder="Description (max 200 chars)" value={ editedPage.description } 
								onChange={(event) => { setEditedPage({ ...editedPage, description: event.target.value })}}/>  {/*update description*/}
						</div>

						<h2 className={ "form__label--center" } style={{ marginTop: "10px", marginBottom: "10px" }}>Type *</h2>
						<form className={ "radioForm" }>
							<div className="radioContainer" >
								<input type="radio" value="0" id="Menu"
									defaultChecked={ editedPage.type === "0" || editedPage.type === "Menu" }
									onChange={ (e) => { setEditedPage({ ...editedPage, type: e.target.value })}} name="Type" />
								<label className={ "radio__label" }>Menu</label>
							</div>

							<div className="radioContainer" >
								<input type="radio" value="1" id="Events"
									defaultChecked={ editedPage.type === "1" || editedPage.type === "Events" }
									onChange={ (e) => { setEditedPage({ ...editedPage, type: e.target.value })}} name="Type" />
								<label className={ "radio__label" }>Events</label>
							</div>

							<div className="radioContainer">
								<input type="radio" value="2" id="Content"
									defaultChecked={ editedPage.type === "2" || editedPage.type === "Content" }
									onChange={ (e) => { setEditedPage({ ...editedPage, type: e.target.value })}} name="Type" />
								<label className={ "radio__label" }>Content</label>
							</div>
						</form>

						{!page.isActive &&   //allow changing publishing date only if page is inactive
						<>
							<h2 className={ "form__label--center" } style={{ marginTop: "10px", marginBottom: "10px" } }>Publish on *</h2> 
							<Calendar value={editedPage.publishedOn} onChange={(date)=>{setEditedPage({...editedPage,publishedOn:date})}}/>
						</>
						}
						<button style={{ marginTop: "20px" }} className="saveButton"
							onClick={ async () => { //input validation
								if( !editedPage.title.trim() || editedPage.type==null || !editedPage.publishedOn || !editedPage.type){
									setNotification({message:"Please provide all required fields",color:"red"})
									return 
								}
								try {
									const updatedPage = await updatePage({ ...editedPage, type: typeStringToNum(editedPage.type) })
									setPages(pages.filter((page) => page.id !== updatedPage.id).concat(updatedPage)) //remove old page, add updated
									setNotification({message:"Changes saved successfully",color:"white"})
									history.push("/admin")
								}
								catch{
									setNotification({message:"Something went wrong",color:"red"})
								}
							}}>
							Save
							</button>
						<DecorativeLines /> 
					</div>
					: //page is not editable, render read-only
					<div className={ "form__content--view" } style={{ paddingTop: "20px" }}> 
						<div className="attributeContainer" style={{marginTop:"0px"}}>
							<h2 style={{ width: "100%" }} className={ "form__label--center" }>Title</h2>
							<h3> { page.title } </h3>
						</div>

						{ page.description && 
							<div className="attributeContainer">
								<h2 style={{ width: "100%" }} className={ "form__label--center" }>Description</h2>
								<h3> { page.description } </h3>
							</div> }

						<div className="attributeContainer" >
							<h2 style={{ width: "100%" } } className={ "form__label--center" }>Published on</h2>
							<h3> { page.publishedOn.replace(/T/," at ").match(/(.*:.*):/)[1] } </h3> {/*human-friendly date and time*/}
						</div>

						<div className="attributeContainer" >
							<h2 style={{ width: "100%" }} className={ "form__label--center" }>Type</h2>
							<h3> { typeNumToString(page.type) } </h3>
						</div> 
						<DecorativeLines />
					</div>
				}
			</div>
		)
		: (null) //invalid url parameter
}

export default PageOverlay