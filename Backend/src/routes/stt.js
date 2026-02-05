const express = require("express");
const router = express.Router();
const { createClient } = require("@deepgram/sdk");

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

router.post("/", async (req, res) => {
  try {

    const audio = req.body.audio; // base64 audio

    const response = await deepgram.listen.prerecorded.transcribeFile(
      Buffer.from(audio, "base64"),
      {
        model: "nova-2",
        smart_format: true
      }
    );

    const text =
      response.result.results.channels[0].alternatives[0].transcript;

    res.json({ text });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "STT failed" });
  }
});

module.exports = router;
