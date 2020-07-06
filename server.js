const express = require("express");
const fs = require("fs");
const path = require("path");


const app = express();

const PORT = process.env.PORT || 3000;

// Boilerplate for Post method
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Notes.html View Route
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// API Get and Post Routes
app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;
        const arrayOfNotes = JSON.parse(data);
        console.log(arrayOfNotes);
        res.json(arrayOfNotes);
    });
});

app.post("/api/notes", (req, res) => {
    // Read File into memory
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
            return res.send("An error occured reading your data.");
        }
        // Pass Data into Working Variable
        const arrayOfNotes = JSON.parse(data);
        console.log(arrayOfNotes);
        // Push POST into variable
        console.log(req.body);
        arrayOfNotes.push(req.body);
        // Write arrayDB to db.json file
        fs.writeFile("./db/db.json", JSON.stringify(arrayOfNotes), "utf8", (err) => {
            if(err) {
                return res.send("An error occured Writing your data.");
            }
            res.json(arrayOfNotes);
        });
    });
});


// * Route must be last, any route not defined will send index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});


// App Listener Goes at bottom
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});