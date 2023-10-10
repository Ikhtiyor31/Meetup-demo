import express from "express";
const app = express();
app.use(express.json());
app.enable('trust proxy'); // required for proxy setting
import User from "./user.js";

app.get("/server", (req, res) => {
  console.log("request is coming!!")
  return res.send("<h1>CI/CD setup is working well </h1>");
});

app.get("/api/v1/user", (req, res) => {
  return res.send(`name: ${req.query.name}`);
});



var userDB = new Map();
app.post("/api/v1/users/signup", (req, res) => {
  const { username, password } = req.body;
  if (username == undefined || password == undefined) {
    return res
      .status(400)
      .send(`unexprected request fields ${JSON.stringify(req.body)}`);
  }

  const user = new User(username, password);
  if (userDB.has(username)) {
    return res.status(400).send("user already exists.!");
  }
  userDB.set(user.username, user);
  return res.status(200).send(user);
});

app.post("/api/v1/users/signin", (req, res) => {
  const { username, password } = req.body;
  if (username == undefined || password == undefined) {
    return res
      .status(400)
      .send(`unexprected request fields ${JSON.stringify(req.body)}`);
  }
  
  if (!userDB.has(username)) {
    return res.status(400).send("the username is wrong!");
  }

  if (userDB.get(username).password != password) {
    return res.status(400).send("the password is wrong!");
  }

  return res.status(200).send(`user login is successfull`);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
