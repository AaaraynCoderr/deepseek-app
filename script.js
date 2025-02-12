document.getElementById('promptForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const prompt = document.getElementById('prompt').value;
  const resultDiv = document.getElementById('result');

  resultDiv.innerText = "Generating...";

  try {
    const response = await fetch('/api/generate', {  // Correct URL for Flask backend
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend Error:", response.status, errorData);
        resultDiv.innerText = "Error generating text. Please check the console.";
        return;
      }

    const data = await response.json();
    resultDiv.innerText = data.result;
  } catch (error) {
    console.error("Error fetching from backend:", error);
    resultDiv.innerText = "Error generating text. Please check the console.";
  }
});