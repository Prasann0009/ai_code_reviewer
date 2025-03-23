import { useEffect, useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import "./App.css";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`);

  const [review, setReview] = useState(``);

  useEffect(() => {
    prism.highlightAll();
  });

  async function reviewCode() {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/ai/get-review`,
      {
        code,
      }
    );
    setReview(response.data);
  }

  return (
    <main>
      <div className="left">
        <div className="code">
          <AceEditor
            mode="javascript"
            theme="monokai"
            value={code}
            onChange={setCode}
            name="code-editor"
            editorProps={{ $blockScrolling: true }}
            style={{
              width: "100%",
              height: "100%",
              // minHeight: "200px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
            fontSize={18}
          />
        </div>
        <div onClick={reviewCode} className="review">
          Review
        </div>
      </div>
      <div className="right">
        <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
      </div>
    </main>
  );
}

export default App;
