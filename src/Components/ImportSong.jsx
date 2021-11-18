import React, { Component } from 'react'

class ImportSong extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return null
    }

    componentDidMount() {
        window.showDirectoryPicker().then(async x => {
            let fileHandle = x.values();
            let will = { done: false }
            let dataFile = []
            let fun = undefined
            while (!will.done) {
                will = await fileHandle.next();
                let fs = new FileReader();
                if (!will.done) {
                    if (will.value.kind === 'file') {
                        let file = await will.value.getFile();
                        if (file.type.includes('audio')) {
                            fs.onload = () => {
                                dataFile.push(fs.result)
                            }
                            fs.readAsDataURL(file);
                            fun = () => {
                                fs.onloadend = () => {
                                    console.log('onloadend')
                                    let db = window.indexedDB.open('savedAudio');
                                    db.onupgradeneeded = e => {
                                        let db = e.target.result;
                                        let store = db.createObjectStore('Music',{keyPath:"id",autoIncrement:true})
                                        store.createIndex("id","id",{unique:true})
                                        store.createIndex("data","data")
                                    }
                                    db.onsuccess = e => {
                                        let db = e.target.result;
                                        let txn = db.transaction('Music','readwrite')
                                        let store = txn.objectStore('Music')
                                        let end = dataFile.length;
                                        console.log("Total: ",end);
                                        for(let i=0;i<end;i++){
                                            console.log(i);
                                            let query = store.put({
                                                data: dataFile[i]
                                            })
                                            console.log(query)
                                        }
                                        console.log("count: ",store.count())
                                    }
                                }
                            }
                        }
                    }
                } else {
                    fun()
                }
            }
        }).catch(() => { })
        this.props.afterImport();
    }
}

export default ImportSong