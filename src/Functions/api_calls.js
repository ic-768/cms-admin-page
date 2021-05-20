import axios from "axios"
const baseUrl = "https://pagesmanagement.azurewebsites.net/api/ResponsivePages"

const config = {
  headers: {"Content-Type": "application/json"},
}

export const getPages = async () => {
  try {
    const response = await axios.get(baseUrl, config)
    return response.data
  } catch {
    throw Error("Couldn't get pages")
  }
}

export const updatePage = async (page) => {
  try {
    await axios.put(`${baseUrl}/${page.id}`, page, config) //wait for update
    const response = await axios.get(`${baseUrl}/${page.id}`, config) // retrieve
    return response.data
  } catch {
    throw Error("Couldn't update page")
  }
}

export const postPage = async (page) => {
  try {
    const response = await axios.post(baseUrl, page)
    return response.data
  } catch {
    throw Error("Couldn't post page")
  }
}

export const deletePage = async (id) => {
  try {
    const result = await axios.delete(`${baseUrl}/${id}`)
    return result.data.id
  } catch {
    throw Error("Couldn't delete page")
  }
}
