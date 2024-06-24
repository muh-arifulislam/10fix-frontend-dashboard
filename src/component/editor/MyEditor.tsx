import { useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg"; // Import Editor directly

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const MyEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  return (
    <Editor editorState={editorState} onEditorStateChange={setEditorState} />
  );
};

export default MyEditor;
