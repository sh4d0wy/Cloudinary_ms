# Image Upload Microservice

This microservice provides an API endpoint for uploading images from a frontend application to Cloudinary and returns the link to the uploaded image.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine.
- A Cloudinary account with API key, API secret, and cloud name. You can sign up for a Cloudinary account [here](https://cloudinary.com/users/register).

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/sh4d0wy/Cloudinary_ms.git
   ```

2. Install the project dependencies:

   ```bash
   npm install
   ```

3. Configure your Cloudinary credentials by creating a `.env` file in the project root directory and adding the following:

   ```
   CLOUD_NAME=your_cloud_name
   API_KEY=your_api_key
   API_SECRET=your_api_secret
   ```

## Usage

1. Start the microservice:

   ```bash
   npm start
   ```

2. Make a POST request to the `/api/upload` endpoint with the image file as a form data parameter named `image`. You can use tools like `curl` or Postman, or integrate this into your frontend application.

   Example using `curl`:

   ```bash
   curl -X POST -F "image=@path/to/your/image.jpg" http://localhost:3000/api/upload
   ```

   Replace `path/to/your/image.jpg` with the path to the image you want to upload.

3. The microservice will upload the image to Cloudinary and respond with a JSON object containing the image URL:

   ```json
   {
     "imageUrl": "https://res.cloudinary.com/your_cloud_name/image/upload/your_image_public_id.jpg"
   }
   ```

## Contributing

Contributions are welcome! If you find any issues or have improvements to suggest, please open an issue or create a pull request.

## Acknowledgments

- Thanks to Cloudinary for providing a powerful image and video management service.

Feel free to customize this `README.md` file to include any additional information specific to your project or microservice.
