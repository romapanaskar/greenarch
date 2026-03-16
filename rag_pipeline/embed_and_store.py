import os
import json
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer
import vecs

from load_documents import load_documents, chunk_documents

load_dotenv()

# Supabase connection string
# Format: postgresql://postgres:[password]@[host]:5432/postgres
# SUPABASE_URL = os.getenv("SUPABASE_URL")  # e.g. https://abc123.supabase.co
# SUPABASE_KEY = os.getenv("SUPABASE_KEY")  # service role key
#
# # Extract project ref from URL to build the DB connection string
# project_ref = SUPABASE_URL.replace("https://", "").replace(".supabase.co", "")
# DB_CONNECTION = f"postgresql://postgres.{project_ref}:{SUPABASE_KEY}@aws-0-eu-west-1.pooler.supabase.com:6543/postgres"
DB_CONNECTION = os.getenv("DB_CONNECTION")
def main():
    print("Step 1: Loading and chunking documents...")
    docs = load_documents()
    chunks = chunk_documents(docs)

    print("\nStep 2: Loading embedding model...")
    model = SentenceTransformer("all-MiniLM-L6-v2")
    print("Model loaded!")

    print("\nStep 3: Generating embeddings...")
    # Get the text content from each chunk
    texts = [chunk.page_content for chunk in chunks]
    embeddings = model.encode(texts, show_progress_bar=True)
    print(f"Generated {len(embeddings)} embeddings of dimension {len(embeddings[0])}")

    print("\nStep 4: Connecting to Supabase...")
    vx = vecs.create_client(DB_CONNECTION)

    # Get or create the collection
    collection = vx.get_or_create_collection(
        name="documents",
        dimension=384
    )

    print("\nStep 5: Uploading to Supabase...")
    # Prepare records: (id, embedding, metadata)
    records = []
    for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
        # Clean up the source path for readability
        source = os.path.basename(chunk.metadata.get("source", "unknown"))
        metadata = {
            "content": chunk.page_content,
            "source": source,
            "chunk_index": i
        }
        records.append((str(i), embedding.tolist(), metadata))

    # Upload in batches
    batch_size = 100
    for i in range(0, len(records), batch_size):
        batch = records[i:i + batch_size]
        collection.upsert(records=batch)
        print(f"  Uploaded batch {i // batch_size + 1} ({len(batch)} records)")

    print("\nStep 6: Creating search index...")
    collection.create_index(measure=vecs.IndexMeasure.cosine_distance)

    print(f"\nDone! {len(records)} chunks embedded and stored in Supabase.")

if __name__ == "__main__":
    main()
'''
One thing to check — your Supabase region. I used `eu-west-1` in the connection string since you're in Ireland. You can verify your database connection string in Supabase under **Settings → Database → Connection string**. If it's different, update the `DB_CONNECTION` line.

Save the file and run:
'''
# python embed_and_store.py