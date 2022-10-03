import { useState, useEffect } from "react";
import CodeEditor from "./components/Editor";
import Header from "./components/Header";

function App() {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const [html, setHtml] = useState<string>(``);
  const [css, setCss] = useState<string>(``);
  const [js, setJs] = useState<string>(``);

  // setting OUTPUT/RESULT by proving relative values to HTML Document
  const htmlDoc = `<html>
    <body>${html}</body>
    <style>${css}</style>
    <script>${js}</script>
  <html>`;

  useEffect(() => {
    // all the editors will be visible when index = -1 and only one editor will be visible when index >= 0
    function isMobile(): void {
      window.innerWidth >= 700
        ? setSelectedTabIndex(-1)
        : setSelectedTabIndex(0);
    }

    window.addEventListener(`resize`, isMobile);

    return () => {
      window.removeEventListener(`resize`, isMobile);
    };
  });

  useEffect(() => {
    // getting data from local storage if avialable or null if no data is there
    const htmlJSON = localStorage.getItem(`html`);
    const htmlObj =
      htmlJSON !== null
        ? JSON.parse(htmlJSON)
        : {
            html: ``,
            css: ``,
            js: ``,
          };

    setHtml(htmlObj.html);
    setCss(htmlObj.css);
    setJs(htmlObj.js);
  }, []);

  function saveToLocalStorage(): void {
    localStorage.setItem(`html`, JSON.stringify({ html, css, js }));
    alert(`Data is saved successfully in to Local Storage`);
  }

  function clearLocalStorage(): void {
    localStorage.removeItem(`html`);
    setHtml(``);
    setCss(``);
    setJs(``);
  }

  return (
    <>
      <Header
        saveToLocalStorage={saveToLocalStorage}
        clearLocalStorage={clearLocalStorage}
      />

      <main>
        <div className="editor-titles">
          {[`HTML`, `CSS`, `JS`, `Result`].map((element, index) => (
            <h3
              className={`${selectedTabIndex === index ? "active" : ""}`}
              key={index}
              onClick={() =>
                selectedTabIndex >= 0 && setSelectedTabIndex(index)
              }
            >
              {element}
            </h3>
          ))}
        </div>

        <div className="editor-area">
          <CodeEditor
            mode="html"
            value={html}
            onChange={setHtml}
            selectedTabIndex={selectedTabIndex}
            index={0}
          />
          <CodeEditor
            mode="css"
            value={css}
            onChange={setCss}
            selectedTabIndex={selectedTabIndex}
            index={1}
          />
          <CodeEditor
            mode="javascript"
            value={js}
            onChange={setJs}
            selectedTabIndex={selectedTabIndex}
            index={2}
          />

          <div className={`${selectedTabIndex === 3 ? "active" : ""}`}>
            <iframe srcDoc={htmlDoc} frameBorder="0" title="result" />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
