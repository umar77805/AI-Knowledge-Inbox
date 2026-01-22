import { Fragment, type ReactNode } from "react";

interface Props {
  allInteractions: ReactNode[];
}

const FloatingInteractions = ({ allInteractions }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "5",
        position: "fixed",
        bottom: "10px",
        right: "10px",
      }}
    >
      {allInteractions.map((interaction, idx) => (
        <Fragment key={idx}>{interaction}</Fragment>
      ))}
    </div>
  );
};

export default FloatingInteractions;
