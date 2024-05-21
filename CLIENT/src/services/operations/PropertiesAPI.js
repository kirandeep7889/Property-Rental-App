const {ALLPROPERTIES_API,PROPERTY_API}=PropertiesEndpoints
import { apiConnector } from "../apiconnector.js"
import { PropertiesEndpoints } from "../apis.js"



export function allProperties() {
    return async() => {
        try{
            const response = await apiConnector("GET",ALLPROPERTIES_API)
            return response;
        }catch(err){
            console.log(err)
        }
    }
}

export function getProperty() {
    return async() => {
        try{
            const response = await apiConnector("GET",PROPERTY_API)
            return response;
        }catch(err){
            console.log(err)
        }
    }
}
