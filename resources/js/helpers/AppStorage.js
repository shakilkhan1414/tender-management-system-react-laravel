class AppStorage{
    storeToken(token){
        localStorage.setItem('token',token)
    }
    storeUser(user){
        localStorage.setItem('user',user)
    }
    storeUserType(userType){
        localStorage.setItem('userType',userType)
    }
    store(token,user,userType){
        this.storeToken(token)
        this.storeUser(user)
        this.storeUserType(userType)
    }
    clear(){
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('userType')
    }
    getToken(){
        localStorage.getItem('token')
    }
    getUser(){
        localStorage.getItem('user')
    }
    getUserType(){
        localStorage.getItem('userType')
    }
}

export default AppStorage = new AppStorage()
