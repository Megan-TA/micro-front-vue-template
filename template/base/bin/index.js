const inquirer = require('inquirer')
const ora = require('ora')
 
const fs = require('fs')

let applictionAllFileNames = fs.readdirSync('../applications', { withFileTypes: true})
const applictionNames = applictionAllFileNames.filter(item => item.isDirectory()).map(item => item.name)


inquirer.prompt([
    {
        name: 'applicationNames',
        type: 'checkbox',
        choices: applictionNames,
        message: '请选择需要启动的子系统！',
        // val => input => target.applicationNames
        validate: (val) => {
            if (!val.length) {
                return '必须选择一个启动系统！';
            } else {
                return true
            } 
        }
    }   
])
.then(answers => {
    console.log('结果为：', answers)
    const spinner = ora('正在启动系统，请稍后...')
    spinner.start();
    
    setTimeout(() => {
        spinner.color = 'green';
        spinner.succeed('启动成功！');
    }, 3000);
})