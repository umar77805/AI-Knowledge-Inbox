interface Props {
  isVisible: boolean;
}

const Modal = ({ isVisible }: Props) => {
  return (
    <div
      style={{
        width: "90%",
        position: "fixed",
        display: isVisible ? "flex" : "none",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        justifyContent: "center",
      }}
    >
      Modal
    </div>
  );
};

export default Modal;
