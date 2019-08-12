const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());


server.get('/api/accounts', (req, res) => {

    db('accounts')
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(err => {
            res.status(500).json({message: "Could Not Retrieve"})
        })
})

server.post('/api/accounts/', (req, res) => {

    newAccount = req.body

    db('accounts').insert(newAccount)
        .then(arrayId => {
            res.status(201).json({message: "Account Added Successfully!"})
        })
        .catch(err => {
            res.status(500).json({message: "Could Not Add Account"})
        })
})

server.put('/api/accounts/:id', (req, res) => {

    accountId = req.params.id
    accountEdit = req.body
    accountEdit.id = parseInt(accountId)

    console.log(accountEdit)

    db('accounts').where('id', accountId).update(accountEdit)
        .then(obj => {
            res.status(200).json({message: "Account Edited Successfully!"})
        })
        .catch(err => {
            res.status(500).json({message: "Could Not Update"})
        })
})

server.delete('/api/accounts/:id', (req, res) => {

    accountId = req.params.id

    db('accounts').where('id', accountId).del()
        .then(num => {
            res.status(204).end()
        })
        .catch(err => {
            res.status(500).json({message: "Could Not Delete"})
        })
})





module.exports = server;