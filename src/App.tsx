import React from "react";
import { PropsWithChildren, useEffect } from "react";

function App({ children }: PropsWithChildren) {
  return (
    <div
      className={`horizontal full ltr main-section antialiased relative font-nunito text-sm font-normal`}
    >
      {children}
    </div>
  );
}

export default App;
