// const mongo = require('mongodb');
// const MongoClient = mongo.MongoClient;

const inquirer = require('inquirer');

const MongoClient = require('mongodb').MongoClient;
const URL = "mongodb://localhost:27017/mycontacts";

const client = new MongoClient(URL, { useUnifiedTopology: true });
client.connect();
const database = client.db('mycontacts');

async function listar(){
    const collections = await database.listCollections().toArray();
    for(let i in collections){
        const collection = collections[i];
        console.log(collection.name);
    }
    options();
}

async function options() {
    inquirer.prompt(
        [
            {
                type:"rawlist",
                name:"option",
                message:"Escolha uma opccao",
                choices: ["Listar", "Criar", "Apagar"]
            }
        ]
    ).then(function(answears){
        
        switch(answears.option){
            case "Listar":
                listar();
            break;
            case "Criar":
                // criar();
            break;
            case "Apagar":
                // apagar();
            break;
            default:
                options();
            break;
        }


    }).catch(function(error){
        console.log(error);
    });


};

options();

/*
inquirer.prompt(
    [
        {
            type:"input",
            name:"name",
            message:"Como se chama?",
        },
        {
            type:"rawlist",
            name:"job",
            message:"Qual e o teu trabalho?",
            choices: ["Pescador", "Programador", "Contabilista"]
        }
    ]
).then(function(answears){
    console.log("Hello "+ answears.name);
    console.log("Bom trabalho "+ answears.job);
}).catch(function(error){
    console.log(error);
});
*/
