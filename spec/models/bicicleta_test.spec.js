var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');

describe('Testing Bicicletas', function(){
    beforeEach(function(done) {
        var mongoDB = 'mongodb://localhost:27017/testdb';
        mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function() {
            console.log('we are connected to test database!');
            //done();
        });
    });

    afterEach(function() {
        Bicicleta.deleteMany({}, function(err, success) {
            if (err) console.log(err);
            //done();
        });
    });

    describe('Bicicleta.createInstance', () => {
        it('crea una instancia de Bicicleta', () => {
            var bici = Bicicleta.createInstance(1, "verde", "urbana", [10.9, 10.5]);

            expect(bici.code).toBe(1);
            expect(bici.color).toBe("verde");
            expect(bici.modelo).toBe("urbana");
            expect(bici.ubicacion[0]).toEqual(10.9);
            expect(bici.ubicacion[1]).toEqual(10.5);
        });
    });

    describe('Bicicleta.allBicis', () => {
        it('comienza vacia', () => {
            Bicicleta.find({}, function(err, bicis){
                expect(bicis.length).toBe(0);
                //done();
            });
        });
    });

    describe('Bicicleta.add', () => {
        it('agrega solo una bicicleta', () => {
            var aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbana"});
            
            console.log(aBici);

            Bicicleta.add(aBici, function(err, newBici){
                if (err) console.log(err);
                Bicicleta.find({ code: 1 }, function (err, bicis){
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].code).toEqual(aBici.code);

                    //done();
                });
            });
        });
    });

    /* describe('Bicicleta.findByCode', () => {
        it('Debe devolver la bici con code 1', (done) => {
            Bicicleta.allBicis(function(err, bicis){
                expect(bicis.length).toBe(0);

                var aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbana"});
                Bicicleta.add(aBici, function(err, newBici){
                    if (err) console.log(err);

                    var aBici2 = new Bicicleta({code: 2, color: "roja", modelo: "montaña"});
                    Bicicleta.add(aBici2, function(err, newBici) {
                        if (err) console.log(err);
                        Bicicleta.findByCode(1, function (error, targetBici){
                            expect(targetBici.code).toBe(aBici.code);
                            expect(targetBici.color).toBe(aBici.color);
                            expect(targetBici.modelo).toBe(aBici.modelo);

                            done();
                        });
                    });
                });
            });
        });
    }); */
});

/* beforeEach(() => { Bicicleta.allBicis = []; });

describe('Bicicleta.allBicis', () => {
    it('comienza vacia', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});

describe('Bicicleta.add', () => {
    it('agregamos una', () => {
        expect(Bicicleta.allBicis.length).toBe(0);

        var a = new Bicicleta(1, 'rojo', 'urbana', [10.989735, -63.828834]);
        Bicicleta.add(a);

        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(a);
    });
});

describe('Bicicleta.findById', () => {
    it('debe devolver la bici con id 1', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        var aBici = new Bicicleta(1, "verde", "urbana");
        var aBic2 = new Bicicleta(2, "rojo", "montaña");
        Bicicleta.add(aBici);
        Bicicleta.add(aBic2);

        var targetBici = Bicicleta.findById(1);
        expect(targetBici.id).toBe(1);
        expect(targetBici.color).toBe(aBici.color);
        expect(targetBici.modelo).toBe(aBici.modelo);
    });
}); */

