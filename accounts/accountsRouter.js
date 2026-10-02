const express = require('express')
const db = require('../data/dbConfig');

const router = express.Router();


router.get('/', (req, res) => {

    const { limit, sortby, sortdir } = req.query
    // console.log(limit)
    // console.log(sortby)
    // console.log(sortdir)

    const query = db('accounts')

    if(limit) {
        query.limit(limit)
    }

    if(sortby) {
        query.orderBy(sortby, sortdir)
    }

    query
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(err => {
            res.status(500).json({message: "Could Not Retrieve"})
        })
})

router.post('/', (req, res) => {

    newAccount = req.body

    db('accounts').insert(newAccount)
        .then(arrayId => {
            res.status(201).json({message: "Account Added Successfully!"})
        })
        .catch(err => {
            res.status(500).json({message: "Could Not Add Account"})
        })
})

router.put('/:id', (req, res) => {

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

router.delete('/:id', (req, res) => {

    accountId = req.params.id

    db('accounts').where('id', accountId).del()
        .then(num => {
            res.status(204).end()
        })
        .catch(err => {
            res.status(500).json({message: "Could Not Delete"})
        })
})



module.exports = router;