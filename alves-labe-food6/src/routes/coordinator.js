
export const goBack = (navigate) => {
    navigate(-1)
}


export const goToSignUp = (navigate) => {
    navigate(`/signup`)
}
export const goToEditProfile = (navigate) => {
    navigate(`/editprofile`)
}
export const goToEditAddress = (navigate) => {
    navigate(`/editaddress`)
}

export const goToAddress = (navigate) => {
    navigate(`/address`)
}
export const goToProfile = (navigate) => {
    navigate(`/profile`)
}
export const goToHome = (navigate) => {
    navigate("/")
}
export const goToLoginPage = (navigate) => {
    navigate("/login")
}
export const goToRestaurant = (navigate, id) => {
    navigate(`/restaurant/${id}`)
}