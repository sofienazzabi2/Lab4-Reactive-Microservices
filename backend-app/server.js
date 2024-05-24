const express = require("express");
const multer = require("multer");
const AWS = require("aws-sdk");
const fs = require("fs");

const app = express();
const port = 5000;

const upload = multer({ dest: "uploads/" });

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
});
const s3 = new AWS.S3();

// Endpoint to submit loan application
app.post(
  "/api/submitLoanApplication",
  upload.single("document"),
  (req, res) => {
    const { name, email } = req.body;
    const document = req.file;

    // Upload document to S3
    const params = {
      Bucket: "your-bucket-name",
      Key: document.originalname,
      Body: fs.createReadStream(document.path),
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error("Error uploading document to S3:", err);
        res.status(500).json({ error: "Error uploading document to S3" });
      } else {
        console.log("Document uploaded to S3 successfully:", data.Location);
        // Perform additional processing (e.g., store application data in database)
        res
          .status(200)
          .json({ message: "Loan application submitted successfully!" });
      }
    });
  }
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
