const path = require('path');
const fs = require('fs');

const express = require('express');

const router = express.Router();

const rootDir = require('../util/path');

router.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDir, "views", "home.html"));
});

router.get('/create', (req, res, next) => {
    res.sendFile(path.join(rootDir, "views", "create-user.html"));
});

router.post('/add', (req, res, next) => {
    let intext = req.body.userName + "\n";
    fs.appendFile('usersFile.txt', intext, err => {
        res.sendFile(path.join(rootDir, "views", "add.html"));
    });
});

router.get('/users', (req, res, next) => {
    if(fs.existsSync('./usersFile.txt')){
        let data = fs.readFileSync('usersFile.txt', 'utf8');
        len = data.length;
        user_array = data.split("\n");
        user_array.pop();
        if(len === 0){
            res.redirect('/create');
        }
        
        let str = "";
        str += "<body style='background-color: #0a3164; color:white;'>";
        str += "<h1 style='color: #f1c113'>Users' List</h1>";
        str += "<h3><ul>";
        for(const item of user_array){
            str+="<li>"+item+"</li>";
        }
        str += "</ul></h3></body>";
        
        res.send(str);
    }else{
        res.redirect('/create');
    }
});

module.exports = router;