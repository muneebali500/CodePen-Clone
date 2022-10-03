import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-monokai";

interface editorProps {
  onChange(value: string): void;
  mode: string;
  value: string;
  selectedTabIndex: number;
  index: number;
}

export default function CodeEditor(props: editorProps) {
  const { onChange, mode, value, selectedTabIndex, index } = props;

  function handleChange(value: string): void {
    onChange(value);
  }

  console.log(`editor called`);

  return (
    <div className={`${selectedTabIndex === index ? "active" : ""}`}>
      <AceEditor
        mode={mode}
        theme="monokai"
        onChange={handleChange}
        value={value}
        showPrintMargin={true}
        showGutter={true}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          // enableBasicAutocompletion: false,
          // enableLiveAutocompletion: false,
          // enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
          wrap: true,
          highlightActiveLine: false,
        }}
        className="editor"
      />
    </div>
  );
}
