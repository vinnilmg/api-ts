import * as multer from 'multer';

const storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, "uploads/")
    },
    filename: function (request, file, callback) {
        callback(null, file.originalname);
    }
});

const uploads = multer({ storage: storage });

export {uploads};