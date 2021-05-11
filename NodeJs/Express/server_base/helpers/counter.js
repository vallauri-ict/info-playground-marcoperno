let cont;
const mongoose = require('mongoose');

async function Initialize(collection, fieldName) { 
    let select = {};
    let sort = {};
    let criteria = fieldName.toString();
    select[criteria] = 1;
    sort[criteria] = -1;
    let ris = await  collection.findOne({}).select(select).sort(sort);
    cont = ris._doc[fieldName];
    return ris._doc[fieldName]
    
    
}

function AutoIncrement() {
    cont++;
    return cont;
}

module.exports.Initialize = Initialize;
module.exports.AutoIncrement = AutoIncrement;