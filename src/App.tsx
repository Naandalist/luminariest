import React from "react";

function App({ children }: React.PropsWithChildren) {
  return (
    <div
      className={`horizontal full ltr main-section antialiased relative font-nunito text-sm font-normal`}
    >
      {children}
    </div>
  );
}

export default App;
