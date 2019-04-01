const metadata = require('read-metadata')
const path = require('path')
const fs = require('fs')

function getMetadata (){
    let js = path.join(__dirname, 'meta.js')
    // let js = path.join(__dirname, 'meta.js')
    // if (fs.existsSync(json))
    // let opts = metadata.sync(js)
    let opts = require('./meta.js')
    return opts
}