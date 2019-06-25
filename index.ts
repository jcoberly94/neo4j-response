import { v1 as neo4j } from 'neo4j-driver' 
import axios from 'axios' 

interface Config {
    url: string,
    http: boolean,
    user: string,
    password: string
}
interface HTTP {
    data: []
}

class Response {
    private driver: any
    private api: any

    constructor(public config: Config) {
        if(config.http === true) {
            let buff = Buffer.from(`${config.user}:${config.password}`).toString('base64')
            this.api = axios.create({
                headers: {
                    "Authorization": `Basic ${buff}`
                },
                baseURL: config.url
            })
        } else {
            this.driver = neo4j.driver(config.url, neo4j.auth.basic(config.user, config.password))
        }  
    }

    private formatData(results: [HTTP]) {
        if(results.length > 1) {
            return results.map((result: any) => result.map((row: any) => row.row.map((obj: any) => obj)))
        } else if(results[0]){
            return results[0].data.map((row: any) => row.row.map((obj: any) => obj))
        } else {
            return []
        }
    }

    private formatQuery(queries: [string]) {
        return queries.map((query: string) => {return {statement: query}})
    }

    async query(queries: [string]) {
        try {
            let statementList = this.formatQuery(queries)
            let {data} = await this.api.post('/commit', {statements: statementList})
            if(data.errors.length > 0) {
                throw new Error(data.errors)
            }
            let result = this.formatData(data.results)
            return result
        } catch (ex) {
            console.log(ex)
        }  
    }
}
export { Response }
