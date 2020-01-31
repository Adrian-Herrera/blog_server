const express = require("express");
const router = express.Router();

const pool = require("../database");

router.post("/newPost", async (req, res) => {
  const { Title, Description,  Body, Id_cat, Public } = req.body.data;
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
  const { Id_art, Title, Description,  Body, Id_cat, Public } = req.body.data;
  const editPost = {
    Id_art,
    Title,
    Description,
    Body,
    Id_cat,
    Public
  };
  await pool.query("UPDATE articles set ? WHERE Id_art = ?", [editPost, editPost.Id_art]);
  console.log(editPost);
  console.log(editPost.Id_art);
  res.status(200).send("Recibido");
});

// get

router.get("/postList", async (req, res) => {
  const data = await pool.query("SELECT * FROM articles WHERE Active=1");
  //console.log(data);
  res.send(data);
});

router.get("/post", async (req, res) => {
  const data = await pool.query("SELECT * FROM articles WHERE Active=1 AND Public=1");
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

module.exports = router;
