 const express = require("express");
const router = express.Router();
const { createClient } = require("@deepgram/sdk");

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

router.post("/", async (req, res) => {
  try {

    const { text } = req.body;

    const dgResponse = await deepgram.speak.request(
      { text },
      {
        model: "aura-asteria-en",
        encoding: "mp3",
        container: "mp3"
      }
    );

    const stream = await dgResponse.getStream();

    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    const audioBuffer = Buffer.concat(chunks);

    res.set("Content-Type", "audio/mpeg");
    res.send(audioBuffer);

  } catch (err) {
    console.log("TTS ERROR:", err);
    res.status(500).json({ error: "TTS failed" });
  }
});

module.exports = router;
