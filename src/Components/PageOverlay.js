import { useHistory,Link } from "react-router-dom"
import { useState,useEffect } from "react"
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
	const [ editedPage, setEditedPage ] = useState(page ?{ ...page, type: typeNumToString(page.type) }:null)
	const [deploymentDate,setDeploymentDate]=useState(new Date());

	useEffect(()=>{
		setEditedPage({...editedPage,publishedOn:deploymentDate}) 
	},[deploymentDate])

	return page
		? (
			<div style={{width:isEditable?"700px":"300px"}}className="formContainer">
				<div className={ "form__title" }>
					<h3 style={ { marginLeft: "20px", whiteSpace: "normal", overflow: "hidden", textOverflow: "ellipsis" } }>{ page.title }</h3>

					<Link style={ { marginLeft: "auto", marginRight: "15px", alignSelf: "flex-end", color: "white" } }
						onClick={ () => { setIsEditable(!isEditable) } } >
						<AiOutlineEdit size={ "30" } />
					</Link>

					<Link style={ { justifySelf: "flex-end", alignSelf: "flex-end", marginTop: "5px", } } to="/admin" >
					<AiOutlineCloseCircle size={ "30px" }/>
					</Link>
				</div>
				{ isEditable
					?
					editedPage &&
					<div className="form__content--edit" style={ { paddingTop: "20px", flexGrow: "1", display: "flex", flexDirection: "column" } }>
						<h2 className="form__label--left">Title *</h2>
						<input maxLength="50" className="form__input--text" placeholder="Title (max 50 chars)" value={ editedPage.title } onChange={ (event) =>
						{
							setEditedPage({ ...editedPage, title: event.target.value })
						} } />
						<h2 className="form__label--left" style={ { marginTop: "10px" } }>Description</h2>
						<div style={{width:"100%"}}>
						<textarea className="form__input--text" maxLength="200"style={ { height: "80px" } } placeholder="Description (max 200 chars)" value={ editedPage.description } onChange={ (event) =>
						{
							setEditedPage({ ...editedPage, description: event.target.value })
						} } /> 
						</div>

						<h2 className={ "form__label--center" } style={ { marginTop: "10px", marginBottom: "10px" } }>Type *</h2>
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
						{!page.isActive &&   //allow changing publishing date if inactive 
						<>
							<h2 className={ "form__label--center" } style={{ marginTop: "10px", marginBottom: "10px" } }>Publish on *</h2> 
							<Calendar value={deploymentDate} onChange={setDeploymentDate}/>
						</>
						}
						{console.log(page.title,page.type,page.publishedOn)}
						<button style={ { marginTop: "20px" } } className="saveButton"
							onClick={ async () =>
							{
								if(!editedPage.title||editedPage.type==null||!editedPage.publishedOn||!editedPage.type){
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
					:
					<div className={ "form__content--view" } style={ { paddingTop: "20px" } }>

						<div style={ { marginBottom: "20px", flexGrow: "1", overflowWrap: "anywhere", backgroundColor: "#44475a", } }>
							<h2 style={ { width: "100%" } } className={ "form__label--center" }>Title</h2>
							<h3> { page.title } </h3>
						</div>

						{ page.description && <div style={ { marginTop: "20px", marginBottom: "20px", flexGrow: "1", overflowWrap: "anywhere", backgroundColor: "#44475a", } }>
							<h2 style={ { width: "100%" } } className={ "form__label--center" }>Description</h2>
							<h3> { page.description } </h3>
						</div> }

						<div style={ { marginTop: "20px", marginBottom: "20px", flexGrow: "1", overflowWrap: "anywhere", backgroundColor: "#44475a", } }>
							<h2 style={ { width: "100%" } } className={ "form__label--center" }>Published on</h2>
							<h3> { page.publishedOn.replace(/T/," at ") } </h3> {/*human-readable*/}
						</div>

						<div style={ { marginTop: "20px", marginBottom: "20px", flexGrow: "1", overflowWrap: "anywhere", backgroundColor: "#44475a", } }>
							<h2 style={ { width: "100%" } } className={ "form__label--center" }>Type</h2>
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