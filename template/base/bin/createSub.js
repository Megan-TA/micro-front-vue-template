const downloadGitRepo = require('download-git-repo')
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const render = require('consolidate').handlebars.render
const path = require('path')

const repository = 'Megan-TA/micro-front-vue-template'

// downloadGitRepo(repository, '.', (err) => {
//     console.log(err)
// })


function generate () {
    let metalsmith = Metalsmith(path.join(__dirname, 'template'))
    const data = Object.assign(metalsmith.metadata(), {
        name: 'app-name'
    })
    const dest = path.join(__dirname, '../applications/ssss')
    metalsmith
        .source('.') // start from template root instead of `./src` which is Metalsmith's default for `source`
        .use(renderTemplateFiles())
        .destination(dest)
        .build((err, files) => {
            if (err) {
                console.log(err)
                return
            }
            console.log('模版生成成功！')
        })
}

function renderTemplateFiles () {
    return (files, metalsmith, done) => {
        let fileKeys = Object.keys(files)
        let data = metalsmith.metadata()
        return new Promise((resolve, reject) => {
            fileKeys.forEach(item => {
                if (item === 'package.json') {
                    let json = files[item].contents.toString()
                    render(json, data, (err, res) => {
                        if (err) {
                            console.log(err)
                            return
                        }
                        files[item].contents = Buffer.from(res)
                        resolve(done())
                    })
                }
            })
        })
        
        
        
    }
}
generate()