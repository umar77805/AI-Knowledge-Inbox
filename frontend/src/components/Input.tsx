import { useRef } from "react";

interface Props {
  onSubmit: (url: boolean, content: string) => void;
  buttonVal: string;
  placeholderVal: string;
}

const Input = ({ onSubmit, buttonVal, placeholderVal }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const isUrl = (value: string): boolean => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <form
      style={{
        display: "flex",
        justifyContent: "center",
        width: "90%",
        margin: "0 10px",
        gap: "1rem",
      }}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(
          isUrl(inputRef.current?.value || ""),
          inputRef.current?.value || "",
        );

        if (inputRef.current) inputRef.current.value = "";
      }}
    >
      <input
        type="text"
        style={{
          width: "80%",
          height: "40px",
          padding: "10px",
          backgroundColor: "transparent",
          border: "1px solid black",
          borderRadius: "8px",
        }}
        placeholder={placeholderVal}
        ref={inputRef}
      />
      <button
        type="submit"
        style={{
          borderRadius: "8px",
          width: "20%",
          fontSize: "1.2rem",
        }}
      >
        {buttonVal}
      </button>
    </form>
  );
};

export default Input;
