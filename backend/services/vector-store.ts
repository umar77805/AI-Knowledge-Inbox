export type Store = {
  id: string;
  createdAt: Date;
  chunk: string;
  embedding: number[];
  source: {
    type: 'text' | 'url';
    value: string;
  };
};

class VectorStore {
  private store: Store[];

  constructor() {
    this.store = [] as Store[];
  }

  addNewStoreEntry(entry: Store) {
    this.store.push(entry);
  }

  getAllStoreEntries() {
    return this.store;
  }
}

export default new VectorStore();