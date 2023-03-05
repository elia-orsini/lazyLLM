import React, { useState } from "react";
import axios from "axios";
import { ChatMessage } from "types";

const Gpt3Request = ({ secret }) => {
  const [prompt, setPrompt] = useState<string>("");
  const [chat, setChat] = useState<Array<ChatMessage>>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const API_KEY = secret;
    const API_URL = "https://api.openai.com/v1/chat/completions";

    const newResponse = [...chat];
    newResponse.push({ role: "user", content: prompt });

    try {
      const response = await axios.post(
        API_URL,
        {
          model: "gpt-3.5-turbo",
          messages: newResponse,
          max_tokens: 5,
          n: 1,
          temperature: 0.5,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      newResponse.push({ role: "assistant", content: response.data.choices[0].message.content });

      setChat(newResponse);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto h-screen w-full">
      <div>
        {chat &&
          chat.map((item) => (
            <p key={Math.random()} className={`py-2 px-2 ${item.role === "assistant" ? "bg-gray-200" : "bg-gray-50"}`}>
              {item.content}
            </p>
          ))}
      </div>

      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
          <input
            id="chat"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            className="block mr-2 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your message..."
          />

          <button
            type="submit"
            className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-arrow-right-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      secret: process.env.OPEN_AI_SECRET,
    },
  };
};

export default Gpt3Request;
