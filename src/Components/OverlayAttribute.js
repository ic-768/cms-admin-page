const OverlayAttribute = ({ attribute, value }) => ( 
	<div style={ { marginTop: "20px", marginBottom: "20px", flexGrow: "1", overflowWrap: "anywhere", backgroundColor: "#44475a", } }>
		<h2 className={ "form__label" }>{ attribute }</h2>
		<span>{ value }</span>
	</div>

)

export default OverlayAttribute