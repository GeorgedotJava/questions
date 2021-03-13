const express = require('express');
const app = express();
const path = require('path');
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

app.use(express.urlencoded({extended: false}));
app.use(express.json());


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
   });
});

app.get('/pergunta/:id', (req, res) => {
    let id = req.params.id;
    
    PerguntaModel.findOne({
        where: {id: id}
    })
        .then(pergunta => {
        if(pergunta != undefined){

            RespostaModel.findAll({
                where: {perguntaId: pergunta.id},
                order: [['id', 'DESC']]
            }).then(respostas => {
                res.render('pergunta', {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
            
        } else {
            res.redirect('/');
        }
    });  
    
});

app.post('/responder', (req, res) => {
    let corpo = req.body.corpo;
    let perguntaId = req.body.pergunta;

    RespostaModel.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect('/pergunta/'+perguntaId);
    })
});

app.listen(3001, (e) => {
    if(e){
        console.log(`ERRO: ${e}`);
    } else {
        console.log('Server on port 3001');
    }
});
