import axios from "axios"

export const getShifts = async () => {
    return await axios.get('http://localhost:8080/shifts')
}

export const bookShift = async (id : any) => {
    return await axios.post(`http://localhost:8080/shifts/${id}/book`, {
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3002",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type" 
          },
    })
}

export const cancelShift = async (id : any) => {
    return await axios.post(`http://localhost:8080/shifts/${id}/cancel`)
}