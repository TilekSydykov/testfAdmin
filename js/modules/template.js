window.templates = {};
export class Template {
    folder = 'js/templates';

    getTemplate(name, settings){
        let html = this.folder + '/' + name + '.html';
        return new Promise((resolve, reject) => {
            if (typeof templates[html] !== "undefined"){
                let f = templates[html];
                for (let p in settings){
                    f = f.replace(`{{${p}}}`, settings[p])
                }
                resolve(f)
            }else{
                fetch(html).then(e => {
                    e.text().then(f => {

                        templates[html] = f;
                        for (let p in settings){
                            f = f.replace(`{{${p}}}`, settings[p])
                        }
                        resolve(f)
                    })
                })
            }
        })
    };

    getFromArray(name, array){
        let html = this.folder + '/' + name + '.html';
        return new Promise((resolve, reject) => {

            if (typeof templates[html] !== "undefined"){
                let f = templates[html];
                let res = "";
                array.forEach(i =>{
                    f = templates[html];
                    for (let p in i){
                        f =  f.replace(`{{${p}}}`, i[p])
                    }
                    res += f;
                });
                resolve(res)
            }else{
                fetch(html).then(e => {
                    e.text().then(f => {
                        let res = "";
                        templates[html] = f;
                        array.forEach(i =>{
                            f = templates[html];
                            for (let p in i){
                                f =  f.replace(`{{${p}}}`, i[p])
                            }
                            res += f;
                        });
                        resolve(res)
                    })
                })
            }
        })
    }

    templates = {
        login: {
            name: 'login',
            container: null
        },
        main: {
            name: 'main',
            container: '#main'
        }
    }
}
