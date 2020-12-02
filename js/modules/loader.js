import {$} from "./jquery.mod.js";
import {Template} from "./template.js";
import {Api} from "./api.js";

export class Loader {
    constructor(app) {
        this.app = app;
        this.templator = new Template();
        this.api = new Api();
    }

    loadMain(self) {
        beginLoading();
        this.templator.getTemplate(this.templator.templates.main.name).then(e=>{
            this.app.html(e);
            this.api.getTests().then(tests =>{
                this.templator.getFromArray('test', tests).then(html =>{
                    stopLoading();
                    $(this.templator.templates.main.container).html(html);
                    $(".clickable").on('click', e => {
                        self.loadTest(self, e.target.dataset.id);
                    });
                    let add_test_form = $("#add_test_form");
                    add_test_form.on("submit", e => {
                        e.preventDefault();
                        let form = add_test_form.serializeArray();
                        let test_name = form[0]['value'];
                        beginLoading();
                        this.api.createTest(test_name, "TEST").then(e => {
                            stopLoading();
                            self.loadMain(self);
                            toastr.success("ok")
                        }).catch(e=>{
                            stopLoading();
                            self.loadMain(self);
                            toastr.error(e.responseJSON.message);
                        })
                    })
                })
            });
        })
    }

    loadTest(self, id){
        this.templator.getTemplate(this.templator.templates.testPage.name).then(e=>{
            this.app.html(e);
            this.api.getTestsById(id).then(test =>{
                this.templator.getTemplate('testPage', test).then(html =>{
                    this.app.html(html);
                    let testForm = $("#test_form");
                    testForm.on('submit', e => {
                        e.preventDefault();
                        let data = {};
                        let id = -1;
                        testForm.serializeArray().forEach(i => {
                            if(i.name !== 'id'){
                                data[i.name] = i.value;
                            }else{
                                id = i.value;
                            }
                        });
                        this.api.saveTest(id, data);
                    });
                    this.templator.getFromArray('question', test.questions).then(html => {
                        $(this.templator.templates.testPage.container).html(html);
                    });

                })
            });
        })
    }

    loadLogin(self){
        this.templator.getTemplate(this.templator.templates.login.name).then(e =>{
            this.app.html(e);
            $("#login").submit(e =>{
                e.preventDefault();
                const formData = new FormData(e.target);
                this.api.login(formData.get('login'), formData.get('password')).then(e =>{
                    if(e === 'success'){
                        this.loadMain(self);
                        toastr.success(e);
                    }else{
                        toastr.error('Try again')
                    }
                })
            });
        });
    }
}
