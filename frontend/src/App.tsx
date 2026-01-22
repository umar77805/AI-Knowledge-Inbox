import Input from "./components/Input";
import "./App.css";
import { getItems, handleQuery, ingestNewText } from "./services/api-service";
import { useEffect, useState } from "react";

function App() {
  const [listOfItems, setListOfItems] = useState<string[]>([]);
  const [aiResponse, setAiResponse] = useState<string>("");
  const handleIngest = async (type: "url" | "text", content: string) => {
    setListOfItems([...listOfItems, content]);
    const result = await ingestNewText(type, content);

    if (!result) setListOfItems(listOfItems.filter((item) => item !== content));
  };

  const handleAllItems = async () => {
    const result = await getItems();
    if (result) {
      setListOfItems(result.map((item: { value: string }) => item.value));
    }
  };

  const handleQueryCall = async (content: string) => {
    const result = await handleQuery(content);

    if (result) setAiResponse(result.answer || "");
  };

  useEffect(() => {
    handleAllItems();
  }, []);

  return (
    <section className="app-wrapper">
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        AI Knowledge Inbox
      </h1>
      <Input
        buttonVal="Add"
        placeholderVal="Exter your text"
        onSubmit={(url, content) => handleIngest(url ? "url" : "text", content)}
      />

      <div style={{ margin: "1rem 0 0 1rem" }}>
        <h2>All Items:</h2>
        <ul>
          {listOfItems.map((item, idx) => (
            <li key={idx} style={{ listStyle: "none" }}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {listOfItems.length && (
        <Input
          buttonVal="Ask"
          placeholderVal="Ask AI about your notes"
          onSubmit={(_url, content) => handleQueryCall(content)}
        />
      )}

      {aiResponse && <p>{aiResponse}</p>}
    </section>
  );
}

export default App;
