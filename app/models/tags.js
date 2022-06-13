const client = require('../database');



class Tags {
    id;
    name;
        constructor(obj ={}) {
            this.id = obj.id;
            this.name = obj.name;
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
    static findOneTag(id) {
        try {
            console.log('id dans model', id)
            const oneTag = client.query('SELECT * FROM quizbyOnetag WHERE tag_id =$1', [id]);
            return oneTag;
        } catch(error) {
            console.log(error);
        }
    }

};

module.exports = Tags;