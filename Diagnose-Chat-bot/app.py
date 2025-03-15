from flask import Flask, request, jsonify
from src.helper import download_hugging_face_embeddings
from langchain_pinecone import PineconeVectorStore
from langchain_openai import OpenAI
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
from src.prompt import system_prompt_general, system_prompt_menstrual
import os
import re

app = Flask(__name__)

load_dotenv()

PINECONE_API_KEY = os.environ.get('PINECONE_API_KEY')
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')

embeddings = download_hugging_face_embeddings()

index_name = "medicalbot"

# Embed each chunk and upsert the embeddings into your Pinecone index.
docsearch = PineconeVectorStore.from_existing_index(
    index_name=index_name,
    embedding=embeddings
)

retriever = docsearch.as_retriever(search_type="similarity", search_kwargs={"k": 3})

llm = OpenAI(temperature=0.4, max_tokens=500)

# General Q&A Chain
prompt_general = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt_general),
        ("human", "{input}"),
    ]
)

question_answer_chain = create_stuff_documents_chain(llm, prompt_general)
rag_chain = create_retrieval_chain(retriever, question_answer_chain)

# Menstrual Health Chain
prompt_menstrual = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt_menstrual),
        ("human", "{input}"),
    ]
)

menstrual_question_answer_chain = create_stuff_documents_chain(llm, prompt_menstrual)
menstrual_rag_chain = create_retrieval_chain(retriever, menstrual_question_answer_chain)


@app.route("/get", methods=["GET", "POST"])
def chat():
    msg = request.form["msg"]
    print("User Input:", msg)
    response = rag_chain.invoke({"input": msg})
    print("Response:", response["answer"])
    return str(response["answer"])


@app.route("/recommend", methods=["POST"])
def recommend():
    try:
        data = request.get_json()

        # Format the structured input for AI
        user_input = (
            f"Symptoms: {', '.join(data['symptoms'])}\n"
            f"Menstrual Stage: {data['menstrualStage']}\n"
            f"Lifestyle: {data['lifestyle']}\n"
            f"Allergies: {'Yes' if data['allergies'] else 'No'}\n"
            f"Hygiene Products: {', '.join(data['hygieneProducts'])}\n"
            f"Dietary Preferences: {', '.join(data['dietaryPreferences'])}\n\n"
            "Provide expert recommendations for menstrual products, hygiene tips, and dietary suggestions. "
            "Return the response in the following structured format:\n"
            "- Products: (List recommended menstrual products)\n"
            "- Tips: (Provide hygiene tips)\n"
            "- Meals: (Recommend dietary options)\n"
            "Ensure the response is formatted clearly with each section prefixed properly."
        )

        response = menstrual_rag_chain.invoke({"input": user_input})
        raw_text = response["answer"]

        # Extracting structured data from response
        products_match = re.search(r"Products:\s*(.+)", raw_text)
        tips_match = re.search(r"Tips:\s*(.+)", raw_text)
        meals_match = re.search(r"Meals:\s*(.+)", raw_text)

        structured_response = {
            "products": products_match.group(1).strip() if products_match else "No recommendation",
            "tips": tips_match.group(1).strip() if tips_match else "No recommendation",
            "meals": meals_match.group(1).strip() if meals_match else "No recommendation"
        }

        return jsonify(structured_response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
