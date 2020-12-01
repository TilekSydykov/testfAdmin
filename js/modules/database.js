export class Database {
    setToken(token){
        localStorage.setItem('token', token);
        $("#signOut").removeClass("hidden");
    }

    getToken(){
        return localStorage.getItem('token');
    }

    deleteToken(){
        localStorage.removeItem('token');
        $("#signOut").addClass("hidden");
    }

    isLoggedIn(){
        return this.getToken() !== null
    }

}
