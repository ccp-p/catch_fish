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
        resourceMaps = this.initFish(resourceMaps);
        resourceMaps = this.initNet(resourceMaps);  // 添加网资源
        resourceMaps = this.initCoin(resourceMaps);  // 新增加载金币资源
     
      resourceMaps = await this.initImg(resourceMaps);


        console.log('resourceMap', resourceMaps);
     
      dataBus.resources = resourceMaps;
     
    }

    // 新增通用初始化方法
    initResource(prefix, count) {
        return Array.from({ length: count }, (_, i) => ({
            [`${prefix}${i + 1}.png`]: {
                img: null,
                sourceSize: { w: 0, h: 0 }
            }
        })).reduce((acc, curr) => ({ ...acc, ...curr }), {});
    }

    initFish(resourceMap) {
        // 1-5 为鱼的资源
        const fishDatas = [
            // 1~5
            { moveFrame: 4, captureFrame: 4 },
            { moveFrame: 4, captureFrame: 4 },
            { moveFrame: 4, captureFrame: 4 },
            { moveFrame: 4, captureFrame: 4 },
            { moveFrame: 4, captureFrame: 4 },
            // 6
            { moveFrame: 8, captureFrame: 4 },
            // 7
            { moveFrame: 6, captureFrame: 4 },
            // 8
            { moveFrame: 12, captureFrame: 0 ,undead: true},
            { moveFrame: 8, captureFrame: 4 },
            // 10
            { moveFrame: 6, captureFrame: 4 ,undead: true},
        ];
        // 6-10 为炮弹的资源
        const result = {
            ...resourceMap,
            ...fishDatas.map((data, index) => {
                return {
                    [`fish${index + 1}.png`]: {
                        img: null,
                        sourceSize: { w: 0, h: 0 },
                        ...data
                    }
                }
            }).reduce((acc, curr) => ({ ...acc, ...curr }), {})
        }
        return result;
    }

    initCannon(resourceMap) {
        return {
            ...resourceMap,
            ...this.initResource('cannon', 7)
        };
    }

    initNet(resourceMap) {
        return {
            ...resourceMap,
            ...this.initResource('web', 7)  // 假设有一张网的图片
        };
        resourceMap['web.png'] = {
            img: null,
            sourceSize: { w: 0, h: 0 },
            moveFrame: 1
        };
        return resourceMap;
    }

    initCoin(resourceMap) {
        const arr=  ['1','2']
        arr.map((item, index) => {
            resourceMap[`coinAni${item}.png`] = {
                img: null,
                sourceSize: { w: 0, h: 0 },
                moveFrame: 10  // 假设金币有 10 帧动画
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
                    ...webJson.frames,
                    'number_black.png': {
                        img: null,
                        sourceSize: { w: 0, h: 0 }
                    }
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