const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.render('home');
});

app.get('/perguntar', (req, res) => {
    res.render('perguntar');
});

app.post('/salvarpergunta', (req, res) => {
    let nome = req.body.titulo;
    let descricao = req.body.descricao;
    
    res.send('Formulário enviado');
})



app.listen(3001, (e) => {
    if(e){
        console.log(`ERRO: ${e}`);
    } else {
        console.log('Server on port 3001');
    }
})
