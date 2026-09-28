# 🎃 The Women's AI Studio Halloween Hackathon — Club Mad Libs 🍂

A cozy, silly Halloween Mad Libs that turns into a one-act play. Each of the 20 members of Women's AI Studio fills in **two words** in **their own file**, pushes it to GitHub, and the website stitches everyone's words into the finished script.

No coding needed. You'll only edit three lines of a text file.

---

## How it works

```
story.txt          ← the script, with blanks like {{07a}} and {{07b}}
blanks/01.txt      ← one file per student: your name + your two words
blanks/02.txt
...
blanks/20.txt
server/server.js   ← backend: reads the story + everyone's words, sends the finished story
public/index.html  ← frontend: shows the story as a cozy fall script
```

Student 07's **Word A** replaces `{{07a}}` in the first half of the story, and **Word B** replaces `{{07b}}` in the second half. Empty blanks show as beige boxes until someone fills them in.

---

## For students: your mission 🕯️

### 1. Get the repo (once)
```bash
git clone https://github.com/YOUR-CLUB/womens-ai-studio-madlibs.git
cd womens-ai-studio-madlibs
```

### 2. Pull before you start
Always grab everyone else's latest work first:
```bash
git pull
```

### 3. Fill in YOUR file
Your teacher will give you a number. Open **only** that file, e.g. `blanks/07.txt`:
```
Your name: Jordan

Word A type: plural noun, more than one thing (like "socks")
Word A: waffles

Word B type: pet name (like "Mr. Whiskers")
Word B: Captain Meatball
```
Type after the colons. **No peeking at story.txt** — that's the fun part!

### 4. Save it to history (commit)
```bash
git add blanks/07.txt
git commit -m "Jordan filled in student 07's words"
```

### 5. Send it to GitHub (push)
```bash
git push
```
If git says **"rejected"** or **"fetch first"**, someone pushed before you. That's normal! Just run:
```bash
git pull
git push
```

### 6. See the story
```bash
git pull
node server/server.js
```
Open **http://localhost:3000**. The page refreshes itself every 5 seconds. Run `git pull` again in another terminal to watch new words appear. Hover over a word to see who wrote it.

---

## For the teacher: setup

1. **Create the repo** on GitHub (e.g. `womens-ai-studio-madlibs` under your club's account or organization).
2. **Upload these files** from this folder:
   ```bash
   git init
   git add .
   git commit -m "Starting the Women's AI Studio Halloween Mad Libs"
   git branch -M main
   git remote add origin https://github.com/YOUR-CLUB/womens-ai-studio-madlibs.git
   git push -u origin main
   ```
3. **Add students as collaborators**: repo → Settings → Collaborators → Add people. (Or have them fork and open pull requests, if you want to teach that too.)
4. **Hand out numbers** 01–20, one per student.
5. Students need **Git** and **Node.js** installed (Node 16 or newer; no `npm install` needed).

**Fewer than 20 students?** Unfilled blanks just stay as boxes. Give a couple of students a second file, or fill the leftovers yourself.
**More than 20?** Copy a file to `blanks/21.txt`, set its two word types, and add `{{21a}}` and `{{21b}}` somewhere in `story.txt`.

### Bonus lesson: a merge conflict on purpose
Give two students the **same** number. The second one to push will hit a conflict. Walk the class through opening the file, choosing the words to keep, deleting the `<<<<<<<`, `=======`, `>>>>>>>` markers, then `git add`, `git commit`, `git push`.

### Big reveal idea 🎭
Once everyone has pushed, project the site and have volunteers read the parts out loud: Narrator, Pumpkin Bot, Scarecrow, Ghost, Witch, and Everyone (the whole club reads those lines together).

### Reset for the next group
Clear the name and word lines in every `blanks/*.txt` and commit.
