export type DocumentType = "text" | "url";

export type DocumentEntry = {
  id: string;
  type: DocumentType;
  value: string;
  createdAt: Date;
};

class DocumentStore {
  private documents: DocumentEntry[] = [];

  add(document: DocumentEntry) {
    this.documents.push(document);
  }

  getAll(): DocumentEntry[] {
    return this.documents;
  }

  getById(id: string): DocumentEntry | undefined {
    return this.documents.find(doc => doc.id === id);
  }

  deleteById(id: string): boolean {
    const index = this.documents.findIndex(doc => doc.id === id);
    if (index === -1) return false;

    this.documents.splice(index, 1);
    return true;
  }

  clear() {
    this.documents = [];
  }
}

export default new DocumentStore();
