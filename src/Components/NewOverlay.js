import { useHistory } from "react-router-dom"
import { useState } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { postPage } from '../API_calls/calls'

const NewOverlay = ({ pages, setPages }) =>
{
	const history = useHistory()
	const [ newPage, setNewPage ] = useState({ title: "", description: "", type: null })

	return (
		<div className="formContainer">
			<div className={ "form__title" }>
				<h3 style={ { marginLeft: "20px", whiteSpace: "normal", overflow: "hidden", textOverflow: "ellipsis" } }>New Page</h3>
				<AiOutlineCloseCircle size={"30px"}
					style={ { marginLeft: "auto", marginRight: "15px", justifySelf: "flex-end", alignSelf: "flex-end", marginTop: "5px", } }
					onClick={() => { history.push("/admin") }} />   {/*TODO wrap in button for accessibility */ }
			</div>

			<div className={ "form__content" } style={ { paddingTop: "10px" } }>
				<input className={ "form__input--text" } placeholder={ "Title" } value={ newPage.title }
					onChange={ (event) => { setNewPage({ ...newPage, title: event.target.value }) } } />
				<textarea className={ "form__input--text" } style={ { height: "80px" } } placeholder={ "Description" } value={ newPage.description }
					onChange={ (event) => { setNewPage({ ...newPage, description: event.target.value }) } } />  {/**TODO enforce restrictions*/ }

				<h2 className={ "form__label" } style={ { marginTop: "20px", marginBottom: "10px", } }>Type</h2>
				<form className={ "radioForm" } >
					<div className="radioContainer" >
						<input type="radio" value="0" id="Menu"
							onChange={ (e) => { setNewPage({ ...newPage, type: parseInt(e.target.value) }) } } name="Type" />
						<label className={ "radio__label" }>Menu</label>
					</div>

					<div className="radioContainer" >
						<input type="radio" value="1" id="Events"
							onChange={ (e) => { setNewPage({ ...newPage, type: parseInt(e.target.value) }) } } name="Type" />
						<label className={ "radio__label" }>Events</label>
					</div>

					<div className="radioContainer">
						<input type="radio" value="2" id="Content"
							onChange={ (e) => { setNewPage({ ...newPage, type: parseInt(e.target.value) }) } } name="Type" />
						<label className={ "radio__label" }>Content</label>
					</div>
				</form>

				<button
					className="saveButton"
					onClick={ async () =>
					{
						if (!newPage.type || !newPage.title || !newPage.description) {
							console.log("Please provide all requested information")  // TODO notification
							return
						}
						try {
							const updatedPage = await postPage({ ...newPage, type: parseInt(newPage.type) })/*TODO fix type, extract function from other overlay*/
							setPages(pages.concat(updatedPage)) // add updated TODO internal server error...
						}
						catch{
							console.log("something failed")  //TODO notification
						}
					} }>
					save
					</button>
			</div>
		</div>
	)
}

export default NewOverlay