const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const app = express();

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, "public", "uploads"); // This should be where the files are uploaded

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir); // Ensure files are saved to the uploads directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename
  },
});

const upload = multer({ storage: storage });

// Serve static files (HTML)
app.use(express.static("public")); // Assuming your HTML file is in a folder named "public"

// Handle file upload
app.post("/upload", upload.single("image"), (req, res) => {
  console.log("Location:", req.body.location);
  console.log("Location Name:", req.body.locationName);
  console.log("Latitude:", req.body.lat);
  console.log("Longitude:", req.body.lng);

  let imageUrl = null;

  if (req.file) {
    imageUrl = `/uploads/${req.file.filename}`;
    console.log("File uploaded successfully:", req.file);
  } else {
    console.log("No file uploaded.");
  }

  // Send a plain text response
  res.send(
    `${req.body.locationName || "Unknown"},${req.body.lat},${
      req.body.lng
    },${imageUrl}`
  );
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
