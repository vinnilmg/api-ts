import * as multer from 'multer';
import { MulterAzureStorage } from 'multer-azure-blob-storage';

const storage: MulterAzureStorage = new MulterAzureStorage({
    connectionString: 'DefaultEndpointsProtocol=https;AccountName=apidbblob;AccountKey=4hP0CkvMnolALvjlNi8CsOB0BA+Meb92mDOvR7sr6PhRCUS/vEzNjd1Y2OziMmyaj5ElwRnQtvcCaxxTWJrkNA==;EndpointSuffix=core.windows.net',
    accessKey: '4hP0CkvMnolALvjlNi8CsOB0BA+Meb92mDOvR7sr6PhRCUS/vEzNjd1Y2OziMmyaj5ElwRnQtvcCaxxTWJrkNA==',
    accountName: 'apidbblob',
    containerName: 'apitsupload',
    containerAccessLevel: 'blob',
    urlExpirationTime: 60
});

const uploads = multer({ storage: storage });

export default uploads;

`
const storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, "uploads/")
    },
    filename: function (request, file, callback) {
        callback(null, file.originalname);
    }
});
`