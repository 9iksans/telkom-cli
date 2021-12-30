import fs from 'fs'
import '../expression/index.expression.js'



function convertToTxt(input, output) {
    if (output == null){
        output = './converted-log-' + new Date().toISOString() + '.txt'
    }
    fs.readFile(input, "utf8", function (err, data) {
        if (err) {
            console.log(err)
        } else {
            fs.writeFile(output, data, (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("Log file converted successfully");
                    console.log("The written file saved on : " + output);
                }
            })
        }
    });
}

function convertToJson(input, output) {
    if (output == null){
        output = './converted-log-' + new Date().toISOString() + '.json'
    }
    fs.readFile(input, "utf8", function (err, data) {
        if (err) {
            console.log(err)
        } else {
            data = data.split('\n')
            // console.log(data)
            for (var i = 0; i < data.length; i++) {
                //split core 
                data[i] = data[i].split(', ')
                data[i][0] = data[i][0].split(': *')
                data[i][0][0] = data[i][0][0].split(' ')
                //split the main info and make as json, bellow is the main info
                data[i][0][0] = {
                    timestamp : data[i][0][0][0]+ " " +data[i][0][0][1],
                    status : data[i][0][0][2] + " " + data[i][0][0][3],
                    message : data[i][0][1]
                }
                data[i][0] = data[i][0][0]

                //bellow is detail info
                var detail = {}, additionalInfo = []
                for (var j = 1; j < data[i].length; j++){
                    data[i][j] = data[i][j].split(": ")
                    if(data[i][j][1] == null) {
                        additionalInfo.push(data[i][j][0]) 
                    }else{
                        data[i][j][1] = data[i][j][1].replaceAll("\"", "")
                        detail[data[i][j][0]] = data[i][j][1]
                    }
                   
                }
                
                detail.additionalInfo = additionalInfo

                data[i][1] = detail
                data[i] = {...data[i][0], detail : {...data[i][1]}}
                
            }
            data = JSON.stringify(data,null, 4)
            
            fs.writeFile(output, data, (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("Log file converted successfully");
                    console.log("The written file saved on : " + output);
                }
            })
        }
    });
}

export  function loadFile(input, template, output) {
    if(template == "text"){ 
        convertToTxt(input, output);
    }else{
        convertToJson(input, output);
    }
    
}

export function showHelp() {
    var message = `
Help:

    Usage: telkom [ error.log ] [options] 

    Options:
    -                   script read from stdin (default if no file name is provided, interactive mode if a tty)
    --                  indicate the end of node option
    -h, --help          show application help
    -t, --template      option for converting log into json or plain text, if empty the default is plain text
    -o, --output        option for save the converted result

    Documentation can be found at https://github.com/9iksans

    `
    console.log(message)
}