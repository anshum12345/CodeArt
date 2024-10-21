import React, { useState, useEffect } from "react";
import ace from "ace-builds";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/ext-language_tools";
import {
  Box,
  Button,
  MenuItem,
  LinearProgress,
  TextField,
  InputLabel,
  Select,
  IconButton,
  Menu,
  Modal,
} from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { saveAs } from "file-saver";
import Header from './Header'; // Import the Header component

// Ace Editor configuration
ace.config.set("basePath", "https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/");
ace.config.setModuleUrl("ace/mode/javascript_worker", "https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/worker-javascript.js");

function CodeCompiler() {
  const [output, setOutput] = useState("");
  const [lang, setLang] = useState("cpp");
  const [input, setInput] = useState("");
  const [executing, setExecuting] = useState(false);
  const [editorLang, setEditorLang] = useState("c_cpp");
  const [anchorEl, setAnchorEl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState("");

  const defaultCodeArray = {
    cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello World!";\n    return 0;\n}`,
    c: `#include <stdio.h>\nint main() {\n    printf("Hello World!");\n    return 0;\n}`,
    java: `class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello World!");\n    }\n}`,
    python3: `print("Hello World!")`,
    go: `package main\nimport "fmt"\nfunc main() {\n    fmt.Println("Hello World!")\n}`,
    javascript: `console.log("Hello World!")`,
  };

  useEffect(() => {
    setEditorLang(lang === "cpp" || lang === "c" ? "c_cpp" : lang);
    setCode(defaultCodeArray[lang]);
  }, [lang]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const handleDownloadCode = () => {
    const fileExtensions = { java: "java", python3: "py", cpp: "cpp", c: "c", javascript: "js", go: "go" };
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    saveAs(blob, `code.${fileExtensions[lang]}`);
  };

  const createRequest = async () => {
    const data = { src: code, lang, stdin: input };
    setShowModal(true);
    setExecuting(true);

    try {
      const response = await fetch("https://code-box.onrender.com/api/v1/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      setOutput(res);
    } catch (error) {
      setOutput("Network Error or Server Down");
    } finally {
      setExecuting(false);
      setShowModal(false);
    }
  };

  return (
    <>
      <Header /> {/* Add the Header component here */}
      <Modal
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby="onrender-modal-title"
        aria-describedby="onrender-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#19202b", // Set to a blue shade
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            maxWidth: "80%",
            minWidth: "50%",
          }}
        >
          <h2
            id="onrender-modal-title"
            style={{
              color: "white",
              textAlign: "center",
              fontFamily: "poppins",
              fontSize: "1.5rem",
            }}
          >
            Hosted on Render
          </h2>
          <p
            id="onrender-modal-description"
            style={{
              color: "white",
              textAlign: "center",
              fontFamily: "poppins",
              fontSize: "1rem",
            }}
          >
            Backend is currently hosted on a free Render instance. It may take a moment to start due to cold start.
          </p>
        </Box>
      </Modal>
      <Box
        backgroundColor="#19202b" 
        sx={{
          display: "grid",
          height: "92vh",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridGap: "0 20px",
          "& .ace_gutter": {
            backgroundColor: "#19202b", // Match the editor gutter to the background
          },
          "& .ace_editor": {
            backgroundColor: "#19202b", // Match the editor background to the main background
          },
          "& .ace_support.ace_function": {
            color: "primary.main",
          },
          "& #CodeBox": {
            borderRight: "2px solid",
            borderColor: "primary.main",
          },
        }}
      >
        <AceEditor
          mode={editorLang}
          theme="dracula"
          name="CodeBox"
          onChange={setCode}
          value={code}
          fontSize={17}
          showPrintMargin={false}
          style={{
            gridColumn: "span 9",
            height: "100%",
            width: "100%",
          }}
          showGutter={true}
          highlightActiveLine={true}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
          }}
        />
        <div style={{ gridColumn: "span 3", padding: "0px 0px" }}>
          <div style={{ textAlign: "right", width: "inherit" }}>
            <Select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              inputProps={{
                name: "language",
                id: "outlined-age-native-simple",
              }}
              disabled={executing}
              sx={{
                color: "primary.main",
                height: "33px",
                backgroundColor: "dark.main",
                marginLeft: 15,
                marginRight: 1,
              }}
            >
              <MenuItem value={"python3"}>Python</MenuItem>
              <MenuItem value={"c"}>C</MenuItem>
              <MenuItem value={"cpp"}>C++</MenuItem>
              <MenuItem value={"java"}>Java</MenuItem>
              <MenuItem value={"go"}>Golang</MenuItem>
              <MenuItem value={"javascript"}>JS</MenuItem>
            </Select>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={createRequest}
              sx={{
                marginTop: "6px",
                marginBottom: "9px",
                marginRight: "2px",
                color: "text.secondary",
              }}
              startIcon={<PlayArrowRoundedIcon sx={{ color: "text.secondary" }} />}
            >
              Run
            </Button>
            <IconButton
              aria-label="more"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              sx={{
                "& *": {
                  color: "light.main",
                  fontFamily: "poppins",
                },
              }}
            >
              <MenuItem onClick={handleCopyCode}>Copy</MenuItem>
              <MenuItem onClick={handleDownloadCode}>Download</MenuItem>
            </Menu>
            {executing && (
              <LinearProgress size={14} style={{ color: "white", margin: "auto" }} />
            )}
          </div>
          <div style={{ width: "99%" }}>
            <InputLabel
              sx={{
                color: "primary.main",
                margin: "7px 0",
                textAlign: "left !important",
                fontFamily: "poppins",
              }}
            >
              Input
            </InputLabel>
            <TextField
              multiline
              value={input}
              onChange={(e) => setInput(e.target.value)}
              inputProps={{
                style: {
                  fontSize: 20,
                  height: "10rem",
                  color: "#fff",
                },
              }}
              variant="outlined"
              sx={{
                backgroundColor: "text.primary",
                width: "inherit",
              }}
            />
          </div>
          <div style={{ width: "99%", height: "60%" }}>
            <InputLabel
              sx={{
                color: "primary.main",
                margin: "7px 0",
                textAlign: "left !important",
                fontFamily: "poppins",
              }}
            >
              Output
            </InputLabel>
            <Box
              sx={{
                textAlign: "left",
                color: "white",
                overflow: "auto",
                whiteSpace: "pre-line",
                fontFamily: "monospace",
                height: "90%",
                width: "inherit",
                fontSize: "17px",
                backgroundColor: "text.primary",
                border: "1px solid rgba(255, 255, 255, 0.23)",
                borderRadius: "4px",
              }}
            >
              {output?.data?.output || output?.data?.error || output}
            </Box>
          </div>
        </div>
      </Box>
    </>
  );
}

export default CodeCompiler;
