import os
from langchain_community.document_loaders import BSHTMLLoader, PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

# Path to your documents folder
DOCUMENTS_DIR = os.path.join(os.path.dirname(__file__), "documents")

def load_documents():
    """Load all HTML and PDF documents from the documents folder."""
    documents = []

    for filename in os.listdir(DOCUMENTS_DIR):
        filepath = os.path.join(DOCUMENTS_DIR, filename)

        if filename.endswith(".html"):
            print(f"Loading HTML: {filename}")
            loader = BSHTMLLoader(filepath, open_encoding="utf-8")
            documents.extend(loader.load())

        elif filename.endswith(".pdf"):
            print(f"Loading PDF: {filename}")
            loader = PyPDFLoader(filepath)
            documents.extend(loader.load())

        else:
            print(f"Skipping unsupported file: {filename}")

    print(f"\nTotal documents loaded: {len(documents)}")
    return documents

def chunk_documents(documents):
    """Split documents into smaller chunks for embedding."""
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        separators=["\n\n", "\n", ". ", " ", ""]
    )

    chunks = splitter.split_documents(documents)
    print(f"Total chunks created: {len(chunks)}")
    return chunks

if __name__ == "__main__":
    # Load all documents
    docs = load_documents()

    # Show a preview of what was loaded
    for doc in docs[:3]:
        print(f"\nSource: {doc.metadata.get('source', 'unknown')}")
        print(f"Preview: {doc.page_content[:200]}...")

    # Chunk the documents
    chunks = chunk_documents(docs)

    # Show a sample chunk
    print(f"\n--- Sample Chunk ---")
    print(f"Source: {chunks[0].metadata.get('source', 'unknown')}")
    print(f"Content: {chunks[0].page_content[:300]}")

'''
A quick explanation of the key settings:
- **`chunk_size=1000`** — each chunk is roughly 1000 characters (a solid paragraph). Small enough for precise retrieval, big enough to carry context.
- **`chunk_overlap=200`** — chunks overlap by 200 characters so we don't lose meaning at the boundaries.

Save that file and run it:
'''
