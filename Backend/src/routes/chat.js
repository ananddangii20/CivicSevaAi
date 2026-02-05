 const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "llama2",
         
          prompt: `
You are CivicSeva AI.

IMPORTANT RULES:
- Reply in SIMPLE English + Hinglish mix
- Keep answer SHORT (max 2-3 lines)
- No long paragraphs
- No step by step unless user asks
- Sound friendly and helpful
- Talk like normal chat, not textbook
- Give practical civic help only
- If complaint type issue → suggest complaint action
- If scheme question → explain simply

GOOD Example Reply Style:
"Ye water supply issue ho sakta hai. Aap municipal complaint register karo ya local water department se contact karo."

BAD Example:
Long explanation, history, big paragraphs.

User Message:
${message}

Short Reply:
`,
        stream: false
      }
    );

    res.json({
      reply: response.data.response
    });

  } catch (error) {
    console.log("Ollama Error:", error.message);
    res.status(500).json({ error: "Ollama failed" });
  }
});

module.exports = router;
