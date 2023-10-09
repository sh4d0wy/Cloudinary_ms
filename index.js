import { v2 as cloudinary } from 'cloudinary';
import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import streamifier from 'streamifier';
import cors from 'cors';

const storage = multer.memoryStorage();
const upload = multer({ storage });
const app = express();

//Configurations 
dotenv.config();
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET' 
  });


//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());

//POST request to handle file upload and generating url
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    // Upload the file to Cloudinary using a stream
    let stream = await cloudinary.uploader.upload_stream(
      (err, data) => {
        if (data) {
          res.status(200).json({url:data.secure_url});
        } else {
          console.error('Cloudinary upload error:', err);
          res.status(400).json({ error: err.message });
        }
      }
    );

    // Pipe the buffer from the uploaded file to the Cloudinary stream
    streamifier.createReadStream(req.file.buffer).pipe(stream);
  } catch (err) {
    console.error('Internal server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const port = process.env.PORT || 3000; // Default to 3000 if PORT is not set in .env
app.listen(port, () => {
  console.log('Server started at port ' + port);
});


