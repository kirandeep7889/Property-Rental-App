import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { SellerEndpoints } from "../apis";
const {Add_Seller_Property_API,Edit_Seller_Property_API,Delete_Seller_Property_API}=SellerEndpoints


export function addSellerProperty(formData,token) {
    return async() => {
        try{
            console.log("hi")
            const response = await apiConnector("POST",Add_Seller_Property_API,
               formData,
               {
                Authorization: `Bearer ${token}`,
            }
            )
            return response;
        }catch(err){
            console.log(err)
        }
    }
}

export function updateSellerProperty(propertyId,formData,token) {
    return async() => {
        const toastId = toast.loading("Updating...")
        try{
            const response = await apiConnector(
            "PATCH",
            `${Edit_Seller_Property_API}/${propertyId}`,
            formData,
               {
                Authorization: `Bearer ${token}`,
            }
            )
            toast.dismiss(toastId)
            return response;
        }catch(err){
            console.log(err)
        }
    }
}
