import os
from dotenv import load_dotenv
from huggingface_hub import InferenceClient 

# pip install huggingface-hub

load_dotenv()

# Initialize API client (DeepSeek via Hugging Face Inference API)
client = InferenceClient(
    provider="together",  # Or "huggingface" if using a Hugging Face hosted model
    api_key=os.getenv("HUGGINGFACE_API_KEY")
)

def generate_text(prompt): # Corrected function
    messages = [
        {
            "role": "user",
            "content": prompt
        }
    ]
    try:
        completion = client.chat.completions.create(
            model="deepseek-ai/DeepSeek-R1",  # Or your chosen model
            messages=messages,
            max_tokens=500
        )
        return completion.choices[0].message['content']
    except Exception as e:
        print(f"API Error: {e}")
        return None

if __name__ == "__main__":
    while True:  # Loop to allow multiple prompts
        prompt = input("Enter your prompt (or type 'exit' to quit): ")
        if prompt.lower() == "exit":
            break

        result = generate_text(prompt)

        if result:
            print("Generated Text:\n", result)
        else:
            print("Text generation failed.")