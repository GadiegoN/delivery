var fs = require('fs');

module.exports = class ReadCommandSql {

    async restornaStringSql(key, controller) {

        var commandRegex = '';

        try {
            
            await new Promise(async (resolve) => {

                await fs.readFile(`./server/scripts/${controller}.sql`, function (err, buf) {
                    if (err) { 
                        console.log(err); 
                        resolve();
                    }

                    var str = buf.toString();
                    var regex = new RegExp(`^--INIT#${key}#(.*?)^--END#${key}#`, "sm");

                    commandRegex = str.match(regex);
                    commandRegex = commandRegex[0].toString().replace(`--INIT#${key}#`, '').replace(`--END#${key}#`, '')

                    resolve();
                })

            });

        } catch (error) {
            
        }

        return commandRegex;

    }

}