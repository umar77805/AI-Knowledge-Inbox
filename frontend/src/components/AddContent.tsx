import { IoMdAdd } from "react-icons/io";

interface Props {
  onClick: () => void;
}

const AddContent = ({ onClick }: Props) => {
  return (
    <button
      style={{
        borderRadius: "50%",
        border: "1px solid black",
        backgroundColor: "transparent",
        width: "50px",
        aspectRatio: "1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClick}
    >
      <IoMdAdd color="black" size="16px" />
    </button>
  );
};

export default AddContent;
