import {$} from "./jquery.mod.js";
import {Template} from "./template.js";
import {Api} from "./api.js";

export class Loader {
    constructor(app) {
        this.app = app;
        this.templator = new Template();
        this.api = new Api();
    }

    loadMain() {
        this.templator.getTemplate(this.templator.templates.main.name).then(e=>{
            this.app.html(e);
            this.api.getTests().then(tests =>{
                this.templator.getFromArray('test', tests).then(html =>{
                    $(this.templator.templates.main.container).html(html);
                })
            });
        })
    }

    loadLogin(){
        this.templator.getTemplate(this.templator.templates.login.name).then(e =>{
            this.app.html(e);
            $("#login").submit(e =>{
                e.preventDefault();
                const formData = new FormData(e.target);
                this.api.login(formData.get('login'), formData.get('password')).then(e =>{
                    if(e === 'success'){
                        this.loadMain()
                    }
                })
            });
        });
    }
}
