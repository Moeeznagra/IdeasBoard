import express from "express";
import cors from "cors"

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const ideas = [
       {id: 1, text: "Add dark mode", author: "Moeez"},
       {id: 2, text: "Add tags", author: "Sam"}
];

app.get("/health", (_req, res) => {
       res.json({ ok: true});
});

app.get("/ideas", (_req, res) => {
       res.json(ideas);
});

app.post("/ideas", (req, res) => {
       const { text, author } = req.body;

       if(!text || !author) {
              return res.status(400).json({
                     error: "text or author are missing, both are required"
              })
       }

       const newIdea = {
              id: ideas.length + 1,
              text,
              author
       };

       ideas.unshift(newIdea);
       res.status(201).json(newIdea)
})

app.listen(port, () => {
       console.log(`Server listening on http:localhost:${port}`);
})