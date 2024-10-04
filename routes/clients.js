const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clients');
const {userValidation, validationResult } = require('../middleware/validator');

router.get('/', clientsController.getAll);

router.get('/:id', clientsController.getSingle);

router.post('/', userValidation, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    clientsController.createclient(req, res, next);
});

router.put('/:id', userValidation, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    clientsController.updateclient(req, res, next);
});

router.options('/:id', (req, res) => {
    res.set('Allow', 'PUT, PATCH, DELETE'); 
    res.send();
});

router.patch('/:id', userValidation, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    clientsController.updateclient(req, res, next);
});

router.delete('/:id', clientsController.deleteclient);

module.exports = router;
