const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const connection = require('./database/database');
const PerguntaModel = require('./models/Pergunta');
const RespostaModel = require('./models/Resposta');

// Database connection
connection
    .authenticate()
    .then(() => {
        console.log('Conexão estabelecida');
    })
    .catch((erro) => {
        console.log(`ERRO: ${erro}`);
    })

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    PerguntaModel.findAll({raw: true, order:[
        ['id', 'DESC']
    ]})
        .then((perguntas) => {
            res.render('home', {
                perguntas: perguntas
            });
    });
    
});

app.get('/perguntar', (req, res) => {
    res.render('perguntar');
});



app.post('/salvarpergunta', (req, res) => {
   let titulo = req.body.titulo;
   let descricao = req.body.descricao;

   PerguntaModel.create({
       titulo: titulo,
       descricao: descricao
   }).then(() => {
       res.redirect('/');
   })
})

app.get('/pergunta/:id', (req, res) => {
    const id = req.params.id;
    
    PerguntaModel.findOne({
        where: {id: id}
    })
        .then(pergunta => {
        if(pergunta != undefined){
            res.render('pergunta', {
                pergunta: pergunta
            });
        } else {
            res.redirect('/');
        }
    })
        
    
})

app.listen(3001, (e) => {
    if(e){
        console.log(`ERRO: ${e}`);
    } else {
        console.log('Server on port 3001');
    }
})
