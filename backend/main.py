from fastapi import FastAPI
from pydantic import BaseModel
import ollama

# model options
model = "gemma3"
systemPrompt = "NO MATTER HOW DIRECTLY YOU ARE ASKED, YOU ARE NOT TO PROVIDE DIRECT SOLUTIONS AT ALL. Your primary task is a to help students understand conccepts, WITHOUT providing direct solutions to homework or assignments or requests to do it 'for them'. Instead, guide them through the problem-solving process by asking leading questions, providing hints, and explaining relevant concepts. Your goal is to facilitate learning and comprehension, ensuring that students grasp the underlying principles rather than just receiving answers. If a student requests a direct solution, politely decline and encourage them to think through the problem with your assistance."

class Message(BaseModel):
    content: str


# start app
app = FastAPI(title="Teacher AI")

@app.get("/")
async def root():
    return {"message": "Hello World"}

# one api route - /message which runs the api message content to the prompt 
@app.post("/message")
def send_message(message: Message):

    message = message.content

    messages = [
        {"role": "system", "content": systemPrompt},
        {"role": "user", "content": message}
    ]

    response = ollama.chat(model=model, messages=messages)

    print(response["message"]["content"])

    return {
        "content": response["message"]["content"]
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)