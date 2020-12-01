import {Database} from "./database.js";

export class Initializer {
    constructor($, loader) {
        this.database = new Database();
        this.loader = loader;
        this.$ = $;
        this.initLogout()
    }

    initLogout(){
        if(this.database.isLoggedIn()){
            this.$("#signOut").click(e => {
                this.database.deleteToken();
                this.loader.loadLogin();
            })
        }
    }
}
