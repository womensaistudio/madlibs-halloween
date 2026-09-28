// Mad Libs backend — no installs needed, just Node.js.
// Run from the repo folder:   node server.js
// Then open:                  http://localhost:3000

const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname; // everything lives at the top of the repo
const PORT = process.env.PORT || 3000;

// Read one student file (07.txt) and pull out their name and both words.
// Returns two blanks, e.g. "07a" and "07b".
function readStudent(file) {
  const text = fs.readFileSync(path.join(ROOT, file), "utf8");
  const get = (label) => {
    const line = text.split(/\r?\n/).find((l) => l.trim().toLowerCase().startsWith(label));
    return line ? line.slice(line.indexOf(":") + 1).trim() : "";
  };
  const num = file.replace(".txt", "");
  const name = get("your name:");
  return ["a", "b"].map((letter) => ({
    id: num + letter,
    name,
    type: get(`word ${letter} type:`),
    word: get(`word ${letter}:`),
  }));
}

// Build the story: every {{07a}} is swapped for student 07's Word A.
function buildStory() {
  const template = fs.readFileSync(path.join(ROOT, "story.txt"), "utf8");
  const blanks = {};
  const writers = [];
  for (const file of fs.readdirSync(ROOT).sort()) {
    if (!/^\d+\.txt$/.test(file)) continue;
    const pair = readStudent(file);
    pair.forEach((b) => (blanks[b.id] = b));
    if (pair[0].name) writers.push(pair[0].name);
  }

  const lines = template.split(/\r?\n/).filter((l) => l.trim() !== "");
  const parts = lines.map((line) =>
    // Split each line into plain text and blank pieces for the frontend.
    line.split(/(\{\{\d+[ab]\}\})/).filter(Boolean).map((piece) => {
      const m = piece.match(/^\{\{(\d+[ab])\}\}$/);
      if (!m) return { text: piece };
      return { blank: blanks[m[1]] || { id: m[1], type: "?", name: "", word: "" } };
    })
  );

  const used = parts.flat().filter((p) => p.blank).map((p) => p.blank);
  return {
    lines: parts,
    filled: used.filter((b) => b.word).length,
    total: used.length,
    writers,
  };
}

const server = http.createServer((req, res) => {
  if (req.url === "/api/story") {
    try {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(buildStory()));
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }
  // Everything else: serve the frontend page.
  fs.readFile(path.join(ROOT, "index.html"), (err, html) => {
    res.writeHead(err ? 500 : 200, { "Content-Type": "text/html" });
    res.end(err ? "Could not find index.html" : html);
  });
});

server.listen(PORT, () => {
  console.log(`Mad Libs running! Open http://localhost:${PORT}`);
});
