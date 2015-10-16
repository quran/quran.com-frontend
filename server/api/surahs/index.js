import express from 'express';
const router = express.Router();

const controller = require('./controller');

router.get('/', controller.index)


export default router;
