const client = require('../database');



class Tags {
        constructor(obj ={}) {
        for (const proname in obj) {
            this[proname] = obj[proname];
        }
    }
    static findAllTag() {
        try {
           const allTags = client.query('SELECT * FROM tag;',);
               return allTags;
           
        }catch (error) {
            console.log(error);
        }
    }

};

module.exports = Tags;