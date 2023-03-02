export default function downloadJSON(jsonData, filename) {
  const blob = new Blob([JSON.stringify(jsonData)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("download", filename);
  link.setAttribute("href", url);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
