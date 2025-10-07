"use client";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/Context/AuthContext/AuthContext";
import { FaSpinner } from "react-icons/fa";

const Sidebar = ({ handleGetMessages, user }) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for fetching
  const [processing, setProcessing] = useState(false); // Loading state for create/delete
  const [selectedConvId, setSelectedConvId] = useState(null); // Selected conversation

  // Fetch conversations on mount or when user changes
  useEffect(() => {
    const getConversations = async () => {
      if (!user?.email) return;

      try {
        setLoading(true);
        const res = await fetch(
          `/api/conversations/all?creator=${user?.email}`
        );
        const data = await res.json();
        if (data.success) setConversations(data.conversations);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, [user]);

  const handleNewConversation = async () => {
    try {
      setProcessing(true);
      const res = await fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creator: user?.email }),
      });
      const data = await res.json();
      if (data.success)
        setConversations((prev) => [...prev, data.conversation]);
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  const handleDeleteAllConversations = async () => {
    try {
      setProcessing(true);
      const res = await fetch("/api/conversations", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creator: user?.email }),
      });
      const data = await res.json();
      if (data.success) setConversations([]);
      setSelectedConvId(null); // Clear selected conversation
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  const handleSelectConversation = (conv) => {
    setSelectedConvId(conv._id);
    handleGetMessages(conv);
  };

  return (
    <div className="p-4 border-r border-gray-300 w-1/4 h-[calc(100vh-64px)] flex flex-col">
      <h1 className="text-xl font-semibold mb-4">Conversations</h1>

      <button
        className="btn btn-soft bg-transparent btn-error w-full mb-2 flex items-center justify-center gap-2"
        onClick={handleDeleteAllConversations}
        disabled={processing}
      >
        {processing && <FaSpinner className="animate-spin" />}
        Delete All
      </button>

      {/* Conversations List */}
      {loading ? (
        <div className="flex-1 flex justify-center items-center">
          <FaSpinner className="animate-spin text-2xl text-blue-500" />
        </div>
      ) : (
        <ul className="space-y-2 flex-1 overflow-y-auto flex-col-reverse">
          {[...conversations]?.reverse()?.map((conv) => {
            const isSelected = conv._id === selectedConvId;
            return (
              <li
                key={conv?._id}
                className={`btn w-full text-left ${
                  isSelected ? "btn-neutral" : "btn-outline"
                }`}
                onClick={() => handleSelectConversation(conv)}
              >
                {new Date(conv?.createdAt).toLocaleString()}
              </li>
            );
          })}
        </ul>
      )}

      <button
        className="btn btn-accent w-full mt-4 flex items-center justify-center gap-2"
        onClick={handleNewConversation}
        disabled={processing}
      >
        {processing && <FaSpinner className="animate-spin" />}+ New Conversation
      </button>
    </div>
  );
};

// ✅ Center Component
const Center = ({ messages }) => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-gray-300">
        <h2 className="text-lg font-bold">Ask Mithu</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">
            No messages yet. Select a conversation.
          </p>
        ) : (
          messages.map((m, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg shadow-sm w-fit max-w-[50%] ${
                m.role === "assistant"
                  ? "bg-primary dark:bg-muted mr-auto text-left"
                  : "bg-primary-foreground ml-auto text-right"
              }`}
            >
              {m.message}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// ✅ AddNewMessage Component
const AddNewMessage = ({ setNewMessage, newMessage, addNewMessage }) => {
  const handleSubmit = () => {
    if (!newMessage.trim()) return;
    addNewMessage();
    setNewMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="p-4 bg-background border-t border-gray-300 flex items-center justify-center gap-2 w-full">
      <input
        className="input input-bordered flex-1 bg-transparent"
        placeholder="Write a message..."
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        value={newMessage}
      />
      <button className="btn btn-primary" onClick={handleSubmit}>
        Send
      </button>
    </div>
  );
};

// ✅ Main Page Component
const Page = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedConvId, setSelectedConvId] = useState(null);

  const handleGetMessages = async (conv) => {
    try {
      setSelectedConvId(conv?._id);

      const res = await fetch(`/api/conversations/${conv._id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.success) {
        setMessages(data.conversation.messages || []);
      } else {
        console.error("Failed to fetch messages:", data.error);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  const addNewMessage = async () => {
    try {
      const res = await fetch("/api/conversations/chat/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          convId: selectedConvId,
          role: "person",
          message: newMessage,
        }),
      });

      const data = await res.json();

      if (data.success) {
        // ✅ Append message locally
        setMessages((prev) => [
          ...prev,
          { role: "person", message: newMessage },
        ]);
        setNewMessage("");
        await addNewResponse(newMessage);
      } else {
        console.error("Failed:", data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addNewResponse = async (userMsg) => {
    try {
      // 1️⃣ Call OpenRouter API
      const aiRes = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo", // or another available model
            messages: [
              {
                role: "system",
                content:
                  "You are Mithu, a friendly and knowledgeable tutor. Answer the students questions clearly and helpfully.",
              },
              { role: "user", content: userMsg },
            ],
          }),
        }
      );

      const aiData = await aiRes.json();
      const aiMessage =
        aiData?.choices?.[0]?.message?.content ||
        "Sorry, I couldn't generate a response.";

      // 2️⃣ Save the assistant message in MongoDB
      const saveRes = await fetch("/api/conversations/chat/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          convId: selectedConvId,
          role: "assistant",
          message: aiMessage,
        }),
      });

      const saveData = await saveRes.json();

      if (saveData.success) {
        // 3️⃣ Append assistant message locally
        setMessages((prev) => [
          ...prev,
          { role: "assistant", message: aiMessage },
        ]);
      } else {
        console.error("Failed to save assistant message:", saveData.error);
      }
    } catch (error) {
      console.error("Error in addNewResponse:", error);
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] relative">
      {" "}
      {/* Adjust height to exclude navbar (≈64px) */}
      <Sidebar handleGetMessages={handleGetMessages} user={user} />
      <div className="flex flex-col flex-1 relative">
        <Center messages={messages} />
        <AddNewMessage
          setNewMessage={setNewMessage}
          newMessage={newMessage}
          addNewMessage={addNewMessage}
        />
      </div>
    </div>
  );
};

export default Page;
