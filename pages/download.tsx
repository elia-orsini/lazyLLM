import Link from "next/link";
import { useEffect } from "react";

function download() {
  const zipFileUrl = "/results.zip";
  const link = document.createElement("a");
  link.setAttribute("download", "results.zip");
  link.setAttribute("href", zipFileUrl);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function MyPage() {
  useEffect(() => {
    download();
  }, []);
  return <div></div>;
}
