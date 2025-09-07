async function generateVoice() {
  const text = document.getElementById("textInput").value;
  const status = document.getElementById("status");

  if (!text) {
    alert("Please enter some text!");
    return;
  }

  status.textContent = "Generating...";

  try {
    const response = await fetch("https://assi3773-67678.hf.space/run/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [text]  // backend को text भेजना
      }),
    });

    if (!response.ok) {
      throw new Error("Request failed: " + response.status);
    }

    const result = await response.json();
    console.log(result);

    if (result.data && result.data[0]) {
      const audioUrl = result.data[0].url || result.data[0];
      const audio = new Audio(audioUrl);
      audio.play();
      status.textContent = "✅ Audio playing...";
    } else {
      status.textContent = "No audio received from backend.";
    }

  } catch (err) {
    console.error(err);
    status.textContent = "Error: " + err.message;
  }
}
fetch("https://assi3773-67678.hf.space/run/predict", {
