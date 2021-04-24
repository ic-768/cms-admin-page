import axios from "axios"
const baseUrl="https://pagesmanagement.azurewebsites.net/api/ResponsivePages"

export const getPages=async()=>{ 
	const config={
		headers:{ "Content-Type": "application/json"
}
	}
	try{
		const response = await axios.get(baseUrl,config) 	
		return response.data 
	}
	catch{
		console.log("Error on api call") //TODO make notification

	}
	} 
