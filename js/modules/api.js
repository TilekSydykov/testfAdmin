export const baseUrl = "http://localhost:8080/v1";
import {Database} from "./database.js";
import {$} from "./jquery.mod.js";

export class Api {
    routes = {
        'login' : '/auth/signin',
        'account' : '/account',
        'signup' : '/auth/signup',
        'updateAccount' : '/account/update',
        'getTests' : '/tests',
        'getTestById' : '/tests/{id}',
        'createTest': '/tests',
        'saveTest': '/tests/{id}'
    };

    init() {
        this.database = new Database();
        if(this.database.isLoggedIn()){
            $.ajaxSetup({
                headers: { "token": this.database.getToken() }
            });
        }
    }

    getUrl(urlName, settings){
        let url = this.routes[urlName];
        for (let p in settings){
            url = url.replace(`{${p}}`, settings[p])
        }
        return url
    }

    login(name, password){
        let database = new Database();
        return new Promise((resolve, reject) => {
            console.log(baseUrl + this.getUrl("login"))
            $.ajax(baseUrl + this.getUrl("login"), {
                data: JSON.stringify({username: name, password: password}),
                contentType: 'application/json',
                type: 'POST',
                processData: false,
            }).done(function (e) {
                database.setToken(e.token);
                resolve("success")
            }).fail(e=>{
                resolve('fail')
            })
        });
    }

    getTests(){
        let database = new Database();
        return new Promise((resolve, reject) =>{
            $.ajax({
                beforeSend: function (request) {
                    request.setRequestHeader("token", database.getToken());
                },
                url: baseUrl + this.getUrl("getTests"),
                success: e => {
                    resolve(e)
                }
            });
        })
    }

    getTestsById(id){
        let database = new Database();
        return new Promise((resolve, reject) =>{
            $.ajax({
                beforeSend: function (request) {
                    request.setRequestHeader("token", database.getToken());
                },
                url: baseUrl + this.getUrl("getTestById").replace("{id}", id),
                success: e => {
                    resolve(e)
                }
            });
        })
    }

    createTest(name, type){
        let database = new Database();
        return new Promise((resolve, reject) =>{
            $.ajax({
                beforeSend: function (request) {
                    request.setRequestHeader("token", database.getToken());
                },
                type: 'PUT',
                url: baseUrl + this.getUrl("createTest"),
                data: {title: name, type: type},
                statusCode: {
                    200: e =>{
                        resolve(e);
                    },
                    404: e=>{
                        resolve(e);
                    },
                    500: e => {
                        resolve(e);
                    }
                }
            })
        })
    }

    saveTest(id, data){
        let database = new Database();
        return new Promise((resolve, reject) =>{
            $.ajax({
                beforeSend: function (request) {
                    request.setRequestHeader("token", database.getToken());
                },
                type: 'PUT',
                url: baseUrl + this.getUrl("saveTest").replace('{id}', id),
                data: data,
                statusCode: {
                    200: e =>{
                        resolve(e);
                    },
                    404: e=>{
                        resolve(e);
                    },
                    500: e => {
                        resolve(e);
                    }
                }
            })
        })
    }
}
