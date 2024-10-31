import DataBus from "../dataBus.js";
// import json form "../dataBus.js";


const dataBus = new DataBus();
export default class ResourceLoader {
    constructor() {
        this.imageRoot = '../../images/';
        this.resourceMap = {}

        this.init(this.resourceMap)


    }
    async init(resourceMap){

     let resourceMaps  =  await this.initJson(resourceMap)

        resourceMaps = this.initCannon(resourceMaps);
     
      resourceMaps = await this.initImg(resourceMaps);


        console.log('resourceMap', resourceMaps);
     
      dataBus.resources = resourceMaps;
     
    }
    initCannon(resourceMap){
        const arr = Array.from({length: 7}, (v, i) => i + 1);
        const cannon = arr.map(i => {
            return  `cannon${i}.png`
        });
        cannon.forEach(name => {
            resourceMap[name] = {
                img: null,
                sourceSize: {
                    w: 0,
                    h: 0
                }
            }
        })
        
       return resourceMap;
    }
    async initImg(resourceMap){
     const imgPathArr = Object.keys(resourceMap).map(key => (`${this.imageRoot}${key}`));

        const imgArr = await this.loadImgs(imgPathArr);
        
        imgArr.forEach(({img,path}, index) => {
            const key = path.replace(this.imageRoot, '');
            resourceMap[key].img = img;
        })
        return resourceMap;
    }

    async initJson(resourceMap) {
       const jsonName = ['bottom.json', 'bullet.json', 'web.json'];
       const imageRoot = this.imageRoot;
         const jsonFiles = jsonName.map(name => (`${imageRoot}${name}`));
       
         
      return  Promise.all(jsonFiles.map(url => this.fetchJson(url)))
            .then(([bottomJson, bulletJson, webJson]) => {

                resourceMap = {
                    ...bottomJson.frames,
                    ...bulletJson.frames,
                    ...webJson.frames
                }
                const result = {}
                Object.keys(resourceMap).forEach(key => {
                    if(!result[key]){
                        result[key] = {};
                    }
                    result[key].sourceSize = resourceMap[key].sourceSize;
                })
                return result;

            })
            .catch(error => console.error(error));
    }

    fetchJson(path) {
        const result = fetch(path).then(res => {
            return res.json();
        }).then(json => {
            return json;
        })
        return result;

    }
    loadImg(path) {
        return new Promise((resolve, reject) => {
            const img = new Image(path);
            img.src = path;
            img.onload = () => {
                resolve(img);
            }
            img.onerror = () => {
                reject(new Error('图片加载失败'));
            }
        })
    }

    loadImgs(imgPathArr) {
        const maxErrorCount = 3;
        return new Promise((resolve, reject) => {
            const result = []
            let completed = 0;

            const  load= () => {
                imgPathArr.map(path => {
                    let errorCount = 0;
                    
                    this.loadImg(path).then(img => {
                        
                        result.push({
                            img,
                            path
                        });
                        completed++;
                        if (completed === imgPathArr.length) {
                            dataBus.isResourceReady = true;
                            resolve(result);
                        }
                    }).catch(error => {
                        if (errorCount >= maxErrorCount) {
                            reject(new Error('图片加载失败'));
                        }
                        errorCount++;
                        load();
                    })
                })

            }

            load()
        })


    }

    loadResources(obj) {
        let count = 0;
        for (let key in this.src) {
            const img = new Image();
            dataBus.resources[key] = img;
            img.src = this.src[key];
            img.onload = () => {
                count++
                if (count === Object.keys(this.src).length) {
                    dataBus.isResourceReady = true;
                }
            }
            this.src[key] = img;
        }
    }
}