const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { submitIssue, getIssues, updateStatus } = require('../controllers/issueController');
const { protect, authorize } = require('../middleware/auth');

// Multer Storage config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

router.use(protect);

router.post('/submit', upload.single('image'), submitIssue);
router.get('/', getIssues);
router.put('/:id/status', authorize('worker', 'admin'), updateStatus);

module.exports = router;
