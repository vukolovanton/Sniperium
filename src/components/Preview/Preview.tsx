import React, { useRef, useEffect } from "react";
import "./styles.css";

interface PreviewProps {
  code: string;
  err: string;
}

const html = `
<html>
	<head>
		<style>html { background-color: transparent; }</style>
	</head>
	<body>
		<div id="root"></div>
		<script>
			const handleError = (err) => {
				const root = document.querySelector('#root');
				root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
				console.error(err);
			}

			// Handling async errors
			window.addEventListener('error', (event) => {
				event.preventDefault();
				handleError(event.error)
			})
			// Handling casual errors
			window.addEventListener('message', (event) => {
				try {
					eval(event.data);
				} catch (err) {
					handleError(err);
				}
			}, false);
		</script>
	</body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      // Hack to make sure browser has enough time to update and set event listener
      iframe.current.contentWindow.postMessage(code, "*");
    }, 100);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        title="code-snippets"
        srcDoc={html}
        sandbox="allow-scripts"
        ref={iframe}
      />
      {err && <div className="preview-error">{err}</div>}
    </div>
  );
};

export default Preview;
