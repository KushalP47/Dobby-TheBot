const Level = require('../../models/Level');

module.exports = (client) => {
    console.log(`${client.user.username} is at your service`);

    const query = {
        username: "potterhead_vishwa",
        role: "wmc-mentor",
    }

    const level = Level.findOne(query)
    if(level){
        console.log(level);
    }
    else{
        console.log("Query didn't found");
    }
    return;
};