'use client';
import FileUpload from "@/components/file_upload_component";
import { socketService } from "@/services/socket/socketService";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    socketService.connectToServer();
  }, []);
  return (
    <FileUpload />
  );
}
