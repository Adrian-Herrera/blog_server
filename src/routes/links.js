const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../lib/auth");
const pool = require("../database");

const passport = require("passport");

//Post

router.post("/newPost", async (req, res) => {
  const { Title, Description, Body, Id_cat, Public } = req.body.data;
  const newLink = {
    Title,
    Description,
    Body,
    Id_cat,
    Public
  };
  await pool.query("INSERT INTO articles set ?", [newLink]);

  res.status(200).send("Recibido");
});

router.post("/editPost", async (req, res) => {
  const { Id_art, Title, Description, Body, Id_cat, Public } = req.body.data;
  const editPost = {
    Id_art,
    Title,
    Description,
    Body,
    Id_cat,
    Public
  };
  await pool.query("UPDATE articles set ? WHERE Id_art = ?", [
    editPost,
    editPost.Id_art
  ]);
  console.log(editPost);
  console.log(editPost.Id_art);
  res.status(200).send("Recibido");
});

// get

router.get("/postList", async (req, res) => {
  const data = await pool.query("SELECT * FROM articles WHERE Active=1");
  //console.log(data);
  req.flash("success", "Editado correctamente");
  res.send(data);
});

router.get("/post", async (req, res) => {
  const data = await pool.query(
    "SELECT * FROM articles WHERE Active=1 AND Public=1"
  );
  //console.log(data);
  res.send(data);
});

router.get("/CategoryList", async (req, res) => {
  const data = await pool.query("SELECT * FROM categories");
  //console.log(data);
  res.send(data);
});

router.get("/updatePost/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const data = await pool.query("SELECT * FROM articles WHERE Id_art = ?", [
    id
  ]);
  // console.log(id);
  res.send(data);
  // res.send("Editado");
});

// Videos

router.get("/videos", async (req, res) => {
  const data = await pool.query("SELECT * FROM videos WHERE Active=1");
  res.send(data);
});

router.get("/publicvideos", async (req, res) => {
  const data = await pool.query("SELECT * FROM videos WHERE Public=1");
  res.send(data);
});

router.post("/videos", async (req, res) => {
  console.log(req.body);
  const { Name, VideoURL, Public } = req.body;
  const newLink = {
    Name,
    VideoURL,
    Public
  };
  await pool.query("INSERT INTO videos set ?", [newLink]);

  res.status(200).send("Recibido");
});

router.post("/editVideo", async (req, res) => {
  const { Id_vid, Name, VideoURL, Active, Public } = req.body.data;
  const editVideo = {
    Id_vid,
    Name,
    VideoURL,
    Active,
    Public
  };
  await pool.query("UPDATE videos set ? WHERE Id_vid = ?", [
    editVideo,
    editVideo.Id_vid
  ]);
  res.status(200).send("Recibido");
});

// Users

router.get("/users", async (req, res) => {
  const data = await pool.query("SELECT * FROM users");
  res.send(data);
});

// Admin Activate user
router.post("/userActive", async (req, res) => {
  const { Id_usr, Active } = req.body;
  const changeActive = {
    Id_usr,
    Active
  };
  if (changeActive.Active == 1) {
    changeActive.Active = 0;
  } else {
    changeActive.Active = 1;
  }
  console.log(changeActive);
  await pool.query("UPDATE users set ? WHERE Id_usr = ?", [
    changeActive,
    changeActive.Id_usr
  ]);
  res.status(200).send("Recibido");
});

//perfil
// Get only one user
router.get("/perfil/:id", async (req, res) => {
  const id = req.params.id;
  const data = await pool.query(
    "SELECT * FROM users WHERE id_usr = ?",
    id,
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );                      
});
// Update user info
router.put('/profile/:id', (request, response) => {
  const id = request.params.id;
  const data = request.body.data

  pool.query('UPDATE users SET ? WHERE id_usr = ?', [data, id], (error, result) => {
      if (error) throw error;
      response.send('User updated successfully.');
  });
});
module.exports = router;
