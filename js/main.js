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
    index();
});

window.loader = $('#main-spinner');

window.beginLoading = ()=>{
    window.loader.removeClass("hidden");
};

window.stopLoading = () => {
    window.loader.addClass('hidden');
};

function index() {
    if(database.isLoggedIn()){
        loader.loadMain(loader)
    }else {
        loader.loadLogin(loader)
    }
}

$('#logo').click(index);

