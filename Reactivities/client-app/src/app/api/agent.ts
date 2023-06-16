import { Activity } from "/../app/models/Activity";
import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL="http://localhost:5000/api";

const responseBody = (response: AxiosResponse) => response.data

const requests ={
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post<void>(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put<void>(url, body).then(responseBody),
    del: (url: string) => axios.delete<void>(url).then(responseBody)
}

const Activities={
    list: ()=> requests.get("/Activities"),
    details: (id: string)=> requests.get(`/Activities/${id}`),
    create: (activity: Activity)=> requests.post("/Activities", activity),
    edit: (activity: Activity)=> requests.put("/Activities", activity),
    delete: (id: string)=> requests.del(`/Activities/${id}`)
}

const agent={
    Activities
}
export default agent;