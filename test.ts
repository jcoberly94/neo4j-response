import { Response } from './index' 

let api = new Response({
    http: true,
    url: "http://localhost:7474/db/data/transaction",
    user: "neo4j",
    password: "response"
})

let fetchData = async () => {
    let data = await api.query(['match (c:CLIMBER) return {dob: c.Dob, name: c.name}'])
    console.log(data)
}
fetchData()
