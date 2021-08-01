let express = require('express');
let app = express();
const { exec } = require('child_process');

app.set('port', process.env.PORT || 8888);

let server = app.listen(app.settings.port, () => {
    console.log('Server ready on', app.settings.port);
});

app.use(express.urlencoded({ extended: true }));

const testCmd = 
`pwd
ls -a
cd ..
pwd
cd ..
ls -a`

app.get('/shell', (req, res) => {
    exec(testCmd, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            res.send({ success: false});
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.send(`stdout: ${stdout}`);
        // res.send({ success: true });
        console.error(`stderr: ${stderr}`);
    });
    
});