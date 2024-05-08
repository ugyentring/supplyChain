import React, { useEffect, useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

const QrScanner = (props) => {
  const [data, setData] = useState("");

  useEffect(() => {
    console.info(data);
    props.passData(data);
  }, [data, props]);

  return (
    <>
      <Scanner
        onResult={(result, error) => {
          if (result) {
            setData(result?.text);
          }
        }}
        style={{ width: "100%" }}
      />
    </>
  );
};

export default QrScanner;
