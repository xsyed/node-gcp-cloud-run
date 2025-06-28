const express = require('express');
const router = express.Router();

router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

async function getUser(req, res) {
    console.log('GET /users/:id');
    console.log('ID ', req.params.id);
    res.json({ success:  200, id: req.params.id });
}

async function createUser(req, res) {
    console.log('POST /users/');
    console.log(req.body);
    res.json({ success:  200, payload: req.body });
}

async function updateUser(req, res) {
    console.log('PUT /users/:id');
    console.log('ID ', req.params.id);
    res.json({ success:  200, id: req.params.id });
}

async function deleteUser(req, res) {
    console.log('DELETE /users/:id');
    console.log('ID ', req.params.id);
    res.json({ success:  200, id: req.params.id });
}

module.exports = router;