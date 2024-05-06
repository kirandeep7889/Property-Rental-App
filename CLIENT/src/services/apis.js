const BASE_URL = "https://property-rental-app-1.onrender.com/api/v1";


// AUTH ENDPOINTS
export const authEndpoints = {
    SIGNUP_API : BASE_URL + "/user/register",
    LOGIN_API : BASE_URL + "/user/authenticate",
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
    GET_USER_DETAILS_API : BASE_URL + "/profile/getUserDetails",
}


// SETTINGS PAGE API
export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API : BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API : BASE_URL + "/profile/updateProfile",
    UPDATE_PASSWORD_API : BASE_URL + "/profile/updatePassword",
    DELETE_PROFILE_API : BASE_URL + "/profile/deleteProfile"
}


//Get All Properties
export const PropertiesEndpoints={
    ALLPROPERTIES_API :   BASE_URL + "/seller/allProperties",
    PROPERTY_API: BASE_URL + "/properties/:id"
}