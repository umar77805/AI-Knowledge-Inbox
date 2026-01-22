import axios from 'axios';

const apiClient = axios.create({
  baseURL: "http://localhost:4000"
})

export async function ingestNewText(type: 'url' | 'text', content: string) {
  const req = {
    content,
    type
  }

  try {
    const ingestResult = await apiClient.post('ingest', req);
    return ingestResult.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getItems() {

  try {
    const items = await apiClient.get('items');
    return items.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function handleQuery(query: string) {
  try {
    const queryResult = await apiClient.post('query', { query });
    return queryResult.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default apiClient;