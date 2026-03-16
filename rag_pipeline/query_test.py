import os
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer
import vecs

load_dotenv()

DB_CONNECTION = os.getenv("DB_CONNECTION")

# Load the same embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Connect to Supabase
vx = vecs.create_client(DB_CONNECTION)
collection = vx.get_or_create_collection(name="documents", dimension=384)

def query(text, top_k=5):
    """Search the knowledge base with a natural language query."""
    # Generate embedding for the query
    query_embedding = model.encode(text).tolist()

    # Search for similar chunks
    results = collection.query(
        data=query_embedding,
        limit=top_k,
        include_metadata=True,
        include_value=False
    )

    print(f"\nQuery: {text}")
    print(f"{'='*60}")

    for i, result in enumerate(results):
        metadata = result[1]  # (id, metadata) tuple
        print(f"\n--- Result {i+1} ---")
        print(f"Source: {metadata.get('source', 'unknown')}")
        print(f"Content: {metadata.get('content', '')[:300]}...")
        print()

if __name__ == "__main__":
    # Test with some sample queries
    query("What does GSF say about energy efficiency?")
    query("How should companies measure their carbon footprint?")
    query("What are best practices for sustainable cloud architecture?")
# ```
#
# Save and run:
# ```
# python query_test.py