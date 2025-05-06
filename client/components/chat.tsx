"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
// import ImageOptimization from "@/components/image";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chat() {
  const [inputValue, setInputValue] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    // Add user message to the messages array
    const userMessage: Message = {
      role: "user",
      content: inputValue,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);
    setInputValue(""); // Clear input field

    try {
      // Call the API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat?message=${encodeURIComponent(inputValue)}`
      );
      const data = await response.json();

      // Process the response
      let messageContent;
      try {
        // Try parsing in case the message is a JSON string
        const parsedData =
          typeof data.message === "string"
            ? JSON.parse(data.message)
            : data.message;
        messageContent = parsedData.toString();
      } catch (error) {
        // If parsing fails, use the message as is
        console.error("Parsing error:", error);
        messageContent = data.message;
      }

      // Add assistant message
      const assistantMessage: Message = {
        role: "assistant",
        content: messageContent,
      };

      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error("Error fetching from API:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: "Sorry, there was an error processing your request.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-16">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 my-8">
            Start a conversation by typing a message and pressing Enter
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className="flex flex-col items-start justify-start max-h-[calc(100vh-200px)] overflow-y-auto p-4 bg-gray-900 rounded-3xl mb-4"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 mr-2 bg-gray-700 rounded-full">
                  {/* <ImageOptimization /> */}
                  {/* {message.role === "user" ? (
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFCzxivJXCZk0Kk8HsHujTO3Olx0ngytPrWw&s"
                      alt="User"
                      className="w-full h-full rounded-full"
                    />
                  ) : (
                    <img
                      src="https://img.freepik.com/free-vector/graident-ai-robot-vectorart_78370-4114.jpg?semt=ais_hybrid&w=740"
                      alt="Assistant"
                      className="w-full h-full rounded-full"
                    />
                  )} */}
                </div>
                <div className="text-sm font-medium text-white">
                  {message.role === "user" ? "User" : "Assistant"}
                </div>
              </div>
              <div className="p-4 mb-4 text-sm text-white bg-gray-800 rounded-lg">
                {message.content}
              </div>
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex flex-col items-start justify-start max-h-[calc(100vh-200px)] overflow-y-auto p-4 bg-gray-900 rounded-3xl mb-4">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 mr-2 bg-gray-700 rounded-full"></div>
              <div className="text-sm font-medium text-white">Assistant</div>
            </div>
            <div className="p-4 mb-4 text-sm text-white bg-gray-800 rounded-lg">
              Thinking...
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between p-4 bg-gray-900 border-t border-gray-700">
        <form onSubmit={handleSubmit} className="w-full">
          <Input
            placeholder="Input Your Query here !!"
            className="text-amber-50 font-medium"
            value={inputValue}
            onChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  );
}
