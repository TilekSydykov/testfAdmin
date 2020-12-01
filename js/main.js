import {Api} from "./modules/api.js";
import {Template} from "./modules/template.js";
import {$} from "./modules/jquery.mod.js";
import {Database} from "./modules/database.js";
import {Loader} from "./modules/loader.js";
import {Initializer} from "./modules/initializer.js";

const api = new Api();
const templator = new Template();
const app = $('#app');
const database = new Database();
const loader = new Loader(app);
const init = new Initializer($, loader);
window.$ = $;
$(document).ready(e =>{
    if(database.isLoggedIn()){
        loader.loadMain()
    }else {
        loader.loadLogin()
    }
});


