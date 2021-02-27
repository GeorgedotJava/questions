const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'))

app.use(express.static(path.resolve(__dirname, 'public')));


app.get('/', (req, res) => {
    res.render('home');
})





app.listen(3000, (e) => {
    if(e){
        console.log(`ERRO: ${e}`);
    } else {
        console.log('Server on port 3000');
    }
})
