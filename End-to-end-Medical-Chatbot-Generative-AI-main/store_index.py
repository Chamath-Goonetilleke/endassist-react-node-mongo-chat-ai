import pinecone
from langchain_pinecone import PineconeVectorStore
from dotenv import load_dotenv
import os
from src.helper import load_pdf_file, text_split, download_hugging_face_embeddings

load_dotenv()

PINECONE_API_KEY = os.environ.get('PINECONE_API_KEY')
os.environ["PINECONE_API_KEY"] = PINECONE_API_KEY

extracted_data = load_pdf_file(data='Data/')
text_chunks = text_split(extracted_data)
embeddings = download_hugging_face_embeddings()

pinecone.init(api_key=PINECONE_API_KEY, environment="us-east-1")

index_name = "medicalbot"

# Create index if it doesn't exist
if index_name not in pinecone.list_indexes():
    pinecone.create_index(
        name=index_name,
        dimension=384,
        metric="cosine"
    )

# Connect to the existing index
index = pinecone.Index(index_name)

# Embed each chunk and upsert the embeddings into your Pinecone index.
docsearch = PineconeVectorStore.from_documents(
    documents=text_chunks,
    index_name=index_name,
    embedding=embeddings, 
)
