Array.prototype.myfilter = function(fn,initval){
   
    let res = initval?initval:arr[0]
    let index = initval?0:1
    for(let i =0;i<this.length;i++){
        res = fn(res,this[i],i,this)
    }
    return res
}

function PromiseMyAll(PromiseArr){
    return new Promise((resolve,reject)=>{
        let len = PromiseArr.length
        let count = 0
        let res =[]
        for(let i=0;i<len;i++){
            Promise.resolve(PromiseArr[i]).then((val,reason)=>{
                res[i] = val
                count++
                if(count === len){
                    resolve(res)
                }
            }).catch((err)=>{
                reject(err)
            })

        }
    })
}


class Shedule{
    constructor(limit){
        this.limit =limit
        this.queue = []
        this.count=0
    }

    add(PromiseTask){
        return new Promise((resolve,reject)=>{
            PromiseTask.resolve=resolve
            PromiseTask.reject=reject
            this.queue.push(PromiseTask)
            this.start()
        })
    }

    start(){
        if(count>limit){

            const Task = this.queue.shift()
            Task().then(val=>{
                Task.resolve(val)
            }).catch((err)=>{
                Task.reject(err)
            }).finally(
                ()=>{
                    this.count--
                this.start()
                }
            )
        }
    }
}

let keys = this.Map.keys()
while(this.cap<this.Map.size()){
    this.Map.delete(keys.next().value)
}