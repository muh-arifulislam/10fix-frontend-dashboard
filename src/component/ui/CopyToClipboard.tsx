import { useRef } from "react";

const CopyToClipboard = ({ value }: { value: string }) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const copyToClipboard = () => {
    if (btnRef?.current) {
      navigator.clipboard.writeText(value);
      btnRef.current.innerText = "Copied!";
      setTimeout(() => {
        if (btnRef.current) {
          btnRef.current.innerText = "Copy";
        }
      }, 2000);
    }
  };
  return (
    <div>
      <button
        onClick={() => {
          copyToClipboard();
        }}
        ref={btnRef}
        style={{
          padding: "4px 15px",
          fontSize: "14px",
          borderRadius: "3px",
          border: 0,
          backgroundColor: "blue",
          color: "white",
        }}
      >
        Copy
      </button>
    </div>
  );
};

export default CopyToClipboard;
