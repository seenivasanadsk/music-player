import React, { Component } from 'react'

class Get extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    savedCount = () => {
        console.log('savedCount')
        let db = window.indexedDB.open('savedAudio');
        console.log(db)
        db.onsuccess = e => {
            let db = e.target.result;
            let txn = db.transaction('Music', 'readonly')
            let store = txn.objectStore('Music')
            console.log("count: ", store.count())
        }
    }

    render() {
        return (
            <div className='Get'>
                <button onClick={this.savedCount}>Count</button>

            </div>
        )
    }
}

export default Get