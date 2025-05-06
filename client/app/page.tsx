import FileUpload from "@/components/file-upload";
import Chat from "@/components/chat";
export default function Home() {
  return (
    <div className="flex flex-row items-center justify-center max-h-full p-4 bg-gray-900">
      <div className="flex flex-col items-center justify-center max-w-2xl p-4 bg-gray-900 rounded-3xl">
        <h1 className="mb-8 text-3xl font-extrabold text-white">
          PDF AI Assistant
        </h1>
        <FileUpload />
      </div>
      <div className="min-h-full border-l-2 "></div>
      <div className="w-full max-w-2xl p-4 bg-gray-900 rounded-3xl">
        <Chat />
      </div>
    </div>
  );
}
