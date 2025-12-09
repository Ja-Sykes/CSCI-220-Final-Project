const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const session = require("express-session"); // for login sessions

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static("public"));

// Session middleware
app.use(session({
    secret: "supersecretkey", // change this to a secure random string
    resave: false,
    saveUninitialized: false,
}));

// DB CONNECTION
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "#AppDevLegend27!",
    database: "usf_esports"
});

// CONTACT FORM API
app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;
    const sql = "INSERT INTO messages (name, email, message) VALUES (?,?,?)";
    db.query(sql, [name, email, message], (err) => {
        if (err) return res.json({ status: "error" });
        res.json({ status: "ok" });
    });
});

// REGISTER API
app.post("/api/register", (req, res) => {
    const { email, name, password } = req.body;
    const sql = "INSERT INTO users (email, name, password) VALUES (?, ?, ?)";
    db.query(sql, [email, name, password], (err) => {
        if (err) return res.json({ status: "error" });
        res.json({ status: "ok" });
    });
});

// LOGIN API
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, results) => {
        if (err) return res.json({ status: "error" });
        if (results.length > 0) {
            // Save user info in session
            req.session.user = { id: results[0].id, name: results[0].name, email: results[0].email };
            res.json({ status: "ok" });
        } else {
            res.json({ status: "fail" });
        }
    });
});

// LOGOUT API
app.post("/api/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) return res.json({ status: "error" });
        res.json({ status: "ok" });
    });
});

// SHOP PAGE - render EJS with user info if logged in
app.set("view engine", "ejs");
app.get("/shop", (req, res) => {
    res.render("shop", { user: req.session.user || null });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
