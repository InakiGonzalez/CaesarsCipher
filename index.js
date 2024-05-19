const readlineSync = require('readline-sync');
const fs = require('fs');
const path = require('path');


function caesarCipher(str,idx){

    let result = "";
    let alphabet = "abcdefghijklmnopqrstuvwxyz";
    for(let letter of str){
        let index = alphabet.indexOf(letter);
        letter = letter.toLowerCase();
        if(index !== -1){
            let newIndex = (index +idx) % 26;
            let newLetter = alphabet[newIndex];
            result += newLetter;
        }
    }
    return result;
}

function registerUser(){
    let name = readlineSync.question("Enter your name: ");
    let password = readlineSync.question("Enter your password: ");
    let passwordCiph = caesarCipher(password,7);

    addUser(name,passwordCiph);
    console.log("Welcome, " +name);
    console.log("Password: "+ password);
    console.log("Cipher: "+ passwordCiph);

    
}

function addUser(userName, password_cipher){
    const filePath = path.join(__dirname, 'users.json');
    let users = [];
    
    fs.readFile(filePath, (err, data) => {
        if(err){
          users;
        } else{
            users = JSON.parse(data);
        }
        users.push({userName, password_cipher});
        fs.writeFile(filePath, JSON.stringify(users), (err) =>{
            if(err){
                console.log("Error adding user");
            } else{
                console.log("User added");
            }
        })
    })
}

function login(){
    let userName = readlineSync.question('Enter your name: ');
    let password = readlineSync.question('Enter your password: ');

    const filePath = path.join(__dirname, 'users.json');
    fs.readFile(filePath, (err,data) => {
        if (err){
            console.log("Error finding file");
        } else{
            for(let userNames of JSON.parse(data)){
                if(userName == userNames.userName && caesarCipher(password,7) == userNames.password_cipher){
                    console.log("Welcome, ", userName);
                } else{
                    console.log("Wrong user or password");
                }
            }
        }
    })
}
function menu(){
    let option;
    do {
        option = readlineSync.question("Please select an option: \n 1.Register\n 2.Login\n 3.Exit\n ");
        if (option == '1') {
            registerUser();
        } else if (option == '2') {
            login();
        }
    } while (option !== '3');
}

menu();
