const { where } = require('sequelize');
const db = require('./db.config');

const Customer = db.customers;

function createCustomer(req, res) {
    if (!req.body.title || !req.body.author || !req.body.release_date || !req.body.subject) {
        return res.status(400).send({
            message: "Bad Data"
        })
    }
    const customerObject = {
        title: req.body.title,
        author: req.body.author,
        release_date: req.body.release_date,
        subject: req.body.subject,
    }

    Customer.create(customerObject).then(data => {
        res.send(data);
    }).catch(error => {
        res.status(500).send(error);
    })

}

//get All customer
function findAllCustomer(req, res) {
    Customer.findAll().then(data => {
        res.send(data);
    }).catch(error => {
        res.status(500).send(error);
    })
}

//get By id customer
function findCustomerByid(req, res) {
    Customer.findByPk(req.params.id).then(data => {
        res.send(data);
    }).catch(error => {
        res.status(500).send(error);
    })
}

//update By id customer
function UpdateCustomer(req, res) {
    const newData = {
        id: req.body.id,
        title: req.body.title,
        author: req.body.author,
        release_date: req.body.release_date,
        subject: req.body.subject,
    }
    Customer.update(newData,
        { where: { id: req.body.id } }
    ).then(() => {
        res.send("Updated data successfully for id: " + req.body.id);
    }).catch(error => {
        res.status(500).send(error);
    })
}

//delete By id customer
function deleteCustomer(req, res) {
    Customer.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.send("Delete data successfully for id: " + req.params.id);
    }).catch(error => {
        res.status(500).send(error);
    })
}

module.exports = {
    createCustomer,
    findAllCustomer,
    findCustomerByid,
    UpdateCustomer,
    deleteCustomer
}