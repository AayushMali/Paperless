import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { link } from "fs";

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Support JSON parsing
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Configure views directory

// Dummy user data
const users = {
  user1: { password: "aayush", isPremium: true },
  user2: { password: "kuki", isPremium: false },
};

// Dummy book data
const books = {
  fiction: [
    {
      title: "If We Were Perfect",
      link: "https://drive.google.com/file/d/1CWL27bc0T6OJMvPGat2c2I4LzHNqd_v7/view?usp=drive_link",
      thumbnail: "/images/IF-WE-WERE-PERFECT.jpg", // Corrected path
    },
    {
      title: "It Ends With Us",
      link: "https://drive.google.com/file/d/1Z07SwfAMeMr0FUMb3Vn7kOaYPooCnwQR/view?usp=sharing",
      thumbnail: "/images/it ends with us.jpg", // Corrected path
    },
    {
      title: "Never Never",
      link: "https://drive.google.com/file/d/1454dv_wFyYifQHZ_3zKvQ3C3B6VcQuFo/view?usp=sharing",
      thumbnail: "/images/never never.jpg", // Corrected path
    },
    {
      title: "Things We Never Got Over",
      link: "https://drive.google.com/file/d/18sauOt9qGX-77pvUz26b_s-4pVUgRDWA/view?usp=sharing",
      thumbnail: "/images/things we never got over.jpg", // Corrected path
    },
    {
      title: "Twisted Love",
      link: "https://drive.google.com/file/d/1tptOnX-oksOfxYbYaxGEwOCRK93aNHYo/view?usp=sharing",
      thumbnail: "/images/twisted love.jpg", // Corrected path
    },
  ],
  thriller: [
    {
      title: "Haunting Adeline",
      link: "https://drive.google.com/file/d/12WeFOgaINSCst4c9NlAEAdfo-E7CYImo/view?usp=sharing",
      thumbnail: "/images/Haunting adeline.jpg", // Corrected path
    },
    {
      title: "Never Lie",
      link: "https://drive.google.com/file/d/16Go_61qEpp7St4Zr0l0zhD3q_AkXrAxa/view?usp=sharing",
      thumbnail: "/images/Never lie.jpg", // Corrected path
    },
    {
      title: "Rock Paper Scissors",
      link: "https://drive.google.com/file/d/1h-ilu-qVS3iSbKV_hSJFKbhL787GGq2k/view?usp=sharing",
      thumbnail: "/images/rock paper scissors.jpg", // Corrected path
    },
    {
      title: "The Silent Patient",
      link: "https://drive.google.com/file/d/1goZYpHi1oKfhS9jR4mJMPrgEeu0w6Lxj/view?usp=sharing",
      thumbnail: "/images/the silent patient.jpg", // Corrected path
    },
    {
      title: "Yellowface",
      link: "https://drive.google.com/file/d/14bRIEnodM5-q8iJXf5Tj-kthrhg23mQ2/view?usp=sharing",
      thumbnail: "/images/Yellowface.jpg", // Corrected path
    },
  ],
  manga: [
    {
      title: "Demon Slayer",
      link: "https://drive.google.com/file/d/16A0BXKBIBOvrkPL1hGC--GOknhkbLo92/view?usp=sharing",
      thumbnail: "/images/demon slayer.jpg", // Corrected path
    },
    {
      title: "Jujutsu Kaisen",
      link: "https://drive.google.com/file/d/1zipeYoiEFB9RwPohgYepcYHusduHzWGr/view?usp=sharing",
      thumbnail: "/images/jjk.jpg", // Corrected path
    },
    {
      title: "Naruto",
      link: "https://drive.google.com/file/d/1Fp5yrw8mfuP8LV6Kc5bhG5d_2DZbb7pg/view?usp=sharing",
      thumbnail: "/images/naruto.jpg", // Corrected path
    },
    {
      title: "One Piece",
      link: "https://drive.google.com/file/d/1GVaoY_oC6x27YBRm82T942FvtClWwoou/view?usp=sharing",
      thumbnail: "/images/one piece.jpg", // Corrected path
    },
    {
      title: "Solo Leveling",
      link: "https://drive.google.com/file/d/1YvTZlo0GTwc1r7UbdTVX5M1MU-84dAbO/view?usp=sharing",
      thumbnail: "/images/solo leveling.jpg", // Corrected path
    },
  ],

  historical: [
    {
      title: "1857 India",
      link: "https://drive.google.com/file/d/1R-uPHH1XXM5xtSYS7vgh4aU-i3zT5HwX/view?usp=sharing",
      thumbnail: "/images/1857 india.jpg", // Corrected path
    },
    {
      title: "Economic history of India",
      link: "https://drive.google.com/file/d/1qPHlamoP9ynkv8iP8KR64tCCXiV7jWIK/view?usp=sharing",
      thumbnail: "/images/economic history of india.jpg", // Corrected path
    },
    {
      title: "Modern India",
      link: "https://drive.google.com/file/d/1zAqXnf5dC2U80sOlcYvtWhb5MoGVz9UL/view?usp=sharing",
      thumbnail: "/images/modern india.jpg", // Corrected path
    },
    {
      title: "The Indian Ocean in World History",
      link: "https://drive.google.com/file/d/1od6_eRRNZe0XA0TdT2UDKCKbP_vMhasO/view?usp=sharing",
      thumbnail: "/images/indian ocean histroy.jpg", // Corrected path
    },
    {
      title: "Train to Pakistan",
      link: "https://drive.google.com/file/d/1GdFz_dKNbUn3W3MwZ368c8G-TRIWmT_E/view?usp=sharing",
      thumbnail: "/images/train to pakistan.jpg", // Corrected path
    },
  ],

  spiritual: [
    {
      title: "Bhagvad Gita",
      link: "https://drive.google.com/file/d/1WuNe7wxwQDsX-f3KJj5E_l4iUdreKHYW/view?usp=sharing",
      thumbnail: "/images/spirtual1.jpg", // Corrected path
    },
    {
      title: "Hanuman Chalisa",
      link: "https://drive.google.com/file/d/1iyZbhHStQZKF2nUypaScjWzcQCSowbNW/view?usp=sharing",
      thumbnail: "/images/spirtual2.jpg", // Corrected path
    },
    {
      title: "Ramayana",
      link: "https://drive.google.com/file/d/1lD5tjVaX6W2qqcKcQ_PzN4B9ypBuStsz/view?usp=sharing",
      thumbnail: "/images/spirtual3.jpg", // Corrected path
    },
    {
      title: "Science Of Self Realization",
      link: "https://drive.google.com/file/d/1-iltPO8o-uDF2LSukq2pGw3Ui58powm3/view?usp=sharing",
      thumbnail: "/images/spirtual4.jpg", // Corrected path
    },
    {
      title: "Shri Guru Charitra",
      link: "https://drive.google.com/file/d/1rHrUix_s15Q9XdW8W4mucz__nmB9EquX/view?usp=sharing",
      thumbnail: "/images/spirtual5.jpg", // Corrected path
    },
  ],

  coding: [
    {
      title: "Beginning HTML, XHTML, CSS and JavaScript",
      link: "https://drive.google.com/file/d/1SqPol9kZyh5D4AivBmpi-VEAryPU6269/view?usp=sharing",
      thumbnail: "/images/coding1.jpg", // Corrected path
    },
    {
      title: "C in Depth Easy Beginners To Experts Guide",
      link: "https://drive.google.com/file/d/1EIMsQr8JsgKQ4OrS09W5G-Rdr1_lGttp/view?usp=sharing",
      thumbnail: "/images/coding2.jpg", // Corrected path
    },
    {
      title: "Java in easy steps_ Covers Java 9",
      link: "https://drive.google.com/file/d/1MaX_oeOVnPuwK5mML3JrJd84aEB_6AkQ/view?usp=sharing",
      thumbnail: "/images/coding3.jpg", // Corrected path
    },
    {
      title: "Learn Python in One Day and Learn It Well_ Python for Beginners with Hands-on Project The only book you need to start coding in Python immediately",
      link: "https://drive.google.com/file/d/1uTFGvD9jZg82k52aXEA_qny1VOjvF0uJ/view?usp=sharing",
      thumbnail: "/images/coding4.jpg", // Corrected path
    },
    {
      title: "The Swift Programming Language (Swift 301)",
      link: "https://drive.google.com/file/d/1jW0Fkpq5kE1eULpbMrSc2_dVukWnaU-V/view?usp=sharing",
      thumbnail: "/images/coding5.jpg", // Corrected path
    },
  ],
};

// Dummy genres data
const genres = [
  { name: "Fiction", description: "Explore imaginary worlds and characters." },
  {
    name: "Thriller",
    description: "Experience suspense, twists, and heart-racing moments.",
  },
  {
    name: "Coding",
    description: "Learn programming concepts and explore tech innovations.",
  },
  {
    name: "Manga",
    description: "Discover Japanese comic artistry with rich storytelling.",
  },
  {
    name: "Historical",
    description: "Uncover the past through compelling narratives.",
  },
  {
    name: "Spiritual",
    description: " Explore inner peace, wisdom, and mindfulness.",
  },
];

// Routes
app.get("/", (req, res) => {
  res.render("index", { genres }); // Pass genres to the template
});

app.get("/payment.ejs", (req, res) => {
  res.render("payment.ejs");
});

app.get("/pricing", (req, res) => {
  res.render("pricing");
});

app.get("/home", (req, res) => {
  res.render("genre", { genres }); // Pass genres to the genre selection page
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (users[username] && users[username].password === password) {
    if (users[username].isPremium) {
      res.redirect("/home"); // Redirect to genre page if premium
    } else {
      res.redirect("/pricing"); // Redirect to pricing page if not premium
    }
  } else {
    res.send("Invalid credentials!");
  }
});

app.post("/select-genre", (req, res) => {
  const { genre } = req.body;
  res.redirect(`/books/${genre}`); // Redirect to books page for selected genre
});

app.get("/books/:genre", (req, res) => {
  const genre = req.params.genre;
  const genreBooks = books[genre] || []; // If no books for this genre, default to empty array
  if (genreBooks.length === 0) {
    return res.send(`No books available for the ${genre} genre.`);
  }
  res.render("books", { genreBooks, genre });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});

