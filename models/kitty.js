const mongoose = require("mongoose");


const kittySchema = new mongoose.Schema({
    name: String
});

kittySchema.statics.createInstance = function(code, nombre){
    return new this({
        code: code,
        nombre: nombre
    });
};

kittySchema.methods.toString = function (){
    return 'code: ' + this.code + ' | nombre: ' + this.nombre;
};

kittySchema.statics.allKitys = function (cb) {
    return this.find({}, cb);
};

kittySchema.statics.add = function(aKity, cb) {
    this.create(aKity, cb)
};

kittySchema.statics.findByCode = function (aCode, cb){
    return this.findOne({code: aCode}, cb);
};

module.exports = mongoose.model('Kitty', kittySchema);