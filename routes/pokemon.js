const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

pokemon.post("/", (req, res, next) =>{
    return res.status(200).send(req.body)
});

pokemon.get('/', async (req, res, next) => {
    const pkmn = await db.query("SELECT * FROM pokemon");
    return res.status(200).json({code: 1, message: pkmn})
});

pokemon.get('/:id([0-9]{1,3})',async(req, res, next) =>{
    const id =  req.params.id;
    const lengthPkmn = await db.query("SELECT pok_id FROM pokemon");
    if (id >= 1 && id <= lengthPkmn.length) {
        const pkmn = await db.query(`SELECT * FROM pokemon WHERE pok_id='${id}';`);
        return res.status(200).send({code: 1, message: pkmn}); 
    }
    return res.status(404).json({code: 404, message:"pokemon no encontrado"});
    
});

pokemon.get('/:name([A-Za-z]+)', async(req, res, next) => {
    const name = req.params.name;
    
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_name='"+name+"';"); 
        //return (p.name.toUpperCase() == name.toUpperCase()) && p;
    


    pkmn.length > 0 ? res.status(200).send({code: 1, message: pkmn}): res.status(404).json({code: 404, message:"pokemon no encontrado"});
});

module.exports = pokemon;