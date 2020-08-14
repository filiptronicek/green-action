const fs = require('fs')

const getReadme = (percentage) => {
    const fileToEdit = 'README.md';
    fs.readFile(fileToEdit, 'utf8', function (err,data) {
        if(err) {
            return console.log(err);
        }
        const toWrite = data.replace("<!-- CARBON-STATS -->", `![carbon consumption of this project](https://green-action.vercel.app/api/card?p=${percentage})`);

        fs.writeFile(fileToEdit, toWrite ,(err) => {
          if(err) return console.error(err); 
        });

    });
}
getReadme(68.9);