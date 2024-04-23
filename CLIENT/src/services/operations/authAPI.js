import toast from "react-hot-toast";
import { setLoading, setToken} from "../../slices/authSlice.js"
import { apiConnector } from "../apiconnector.js"
import { authEndpoints } from "../apis.js";
import { setUser } from "../../slices/profileSlice.js";

const {
  LOGIN_API,
  SIGNUP_API
}=authEndpoints;



export function signUp({accountType, firstName, lastName, email, password, navigate}){
    return async(dispatch) => {
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST",SIGNUP_API , {
                accountType, firstName, lastName, email, password
            })
            console.log("SIGN UP API RESPONSE.......", response)


            console.log(response.data.success)
            if(!response.data.success) throw new Error(response.data.message)

            toast.success("SIGNUP SUCCESSFULLY")
            navigate("/login")
        }catch(err){
            toast.error(err.response.data.message);
            navigate("/signup")
        }
        dispatch(setLoading(false))
    }
}

export function login({email, password, navigate}) {
    return async(dispatch) => {
        dispatch(setLoading(true))
        console.log(email,password,navigate)
        try{
            const response = await apiConnector("POST", LOGIN_API, {
                email, password
            })
            console.log("LOGIN API RESPONSE...........", response);
            if(!response.data.success) throw new Error(response.data.message)

            toast.success(response.data.message)
            dispatch(setToken(response.data.token))
            const userImage = response.data.user.image
            ? response.data.user.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}` 
            dispatch(setUser({...response.data.user, image: userImage}));
            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("user", JSON.stringify(response.data.user));

            navigate("/");


        } catch (err) {
                   toast.error(err.response.data.message)
                }  
            dispatch(setLoading(false))
            }
        }       

 export function logout(navigate){
            return (dispatch) => {
                const toastId = toast.loading("Logging Out...")
                dispatch(setToken(null))
                dispatch(setUser(null))
                localStorage.clear()
                toast.success("Logged Out")
                toast.dismiss(toastId)
                navigate("/")
            }
        }       