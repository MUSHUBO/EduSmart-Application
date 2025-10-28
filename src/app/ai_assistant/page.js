"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "@/Context/AuthContext/AuthContext";
import { FaSpinner } from "react-icons/fa";

// Define a constant for the loading message key
const LOADING_MESSAGE = "__LOADING__";

// ---------------- Sidebar ----------------
const Sidebar = ({ handleGetMessages, user }) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [selectedConvId, setSelectedConvId] = useState(null);

  useEffect(() => {
    const getConversations = async () => {
      if (!user?.email) return;
      try {
        setLoading(true);
        const res = await fetch(`/api/conversations/all?creator=${user.email}`);
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
      setSelectedConvId(null);
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
    <div className="p-4 border-r border-gray-300 w-1/4 h-[calc(100vh-64px)] flex flex-col pt-8 bg-base-300">
      <h1 className="text-xl font-semibold mb-4">Conversations</h1>

      <button
        className="btn btn-soft bg-transparent btn-error w-full mb-2 flex items-center justify-center gap-2"
        onClick={handleDeleteAllConversations}
        disabled={processing}
      >
        {processing && <FaSpinner className="animate-spin" />}
        Delete All Conversations
      </button>

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
                key={conv._id}
                className={`btn w-full text-left ${
                  isSelected ? "bg-secondary" : "btn-outline"
                }`}
                onClick={() => handleSelectConversation(conv)}
              >
                {new Date(conv.createdAt).toLocaleString()}
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

// ---------------- Center ----------------
const Center = ({ messages, selectedConvId, messagesLoading }) => {
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    const container = messagesContainerRef.current;
    if (container) {
      // Scroll to the bottom using container's scrollHeight
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    // Scroll after the component has rendered the new messages
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 0);
    return () => clearTimeout(timer); // Cleanup function
  }, [messages, selectedConvId]); // Scroll on new messages AND when a new convo is selected

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-gray-300">
        <h2 className="text-lg font-bold">Ask Mithu</h2>
      </div>
      {/* Scrollable area with ref attached */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-3 bg-background"
        ref={messagesContainerRef}
      >
        {/* Conditional rendering for initial state */}
        {!selectedConvId ? (
          <p className="text-gray-500 text-center mt-10 text-xl font-medium">
            Please select a conversation from to start.
          </p>
        ) : messagesLoading ? ( // Check for message loading
          <div className="flex justify-center items-center h-full pt-20">
            <FaSpinner className="animate-spin text-4xl text-blue-500" />
          </div>
        ) : messages.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">
            No messages yet. Start a conversation!
          </p>
        ) : (
          messages.map((m, i) => {
            const isUser = m.role !== "assistant";
            const isAiLoading = m.message === LOADING_MESSAGE;

            return (
              <div
                key={i}
                className={`p-3 rounded-lg shadow-sm w-fit max-w-[50%] ${
                  isUser
                    ? "bg-primary-foreground ml-auto text-right"
                    : "bg-primary dark:bg-muted mr-auto text-left"
                }`}
              >
                {isAiLoading ? (
                  <div className="flex items-center gap-2 text-gray-500">
                    <FaSpinner className="animate-spin" />
                    <span className="italic">loading</span>
                  </div>
                ) : (
                  m.message
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

// ---------------- AddNewMessage ----------------
const AddNewMessage = ({
  setNewMessage,
  newMessage,
  addNewMessage,
  aiLoading,
  selectedConvId,
}) => {
  // Disabled if AI is loading OR if no conversation is selected
  const isDisabled = aiLoading || !selectedConvId;

  const handleSubmit = () => {
    if (isDisabled || !newMessage.trim()) return;
    addNewMessage();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isDisabled) handleSubmit();
  };

  return (
    <div className="p-4 bg-background border-t border-gray-300 flex items-center justify-center gap-2 w-full">
      <input
        className="input input-bordered flex-1 bg-transparent"
        placeholder={
          !selectedConvId
            ? "Please select a conversation..."
            : "Write a message..."
        }
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        value={newMessage}
        disabled={isDisabled}
      />
      <button
        className="btn btn-primary"
        onClick={handleSubmit}
        disabled={isDisabled}
      >
        {aiLoading && <FaSpinner className="animate-spin mr-2" />}
        Send
      </button>
    </div>
  );
};

// ---------------- Main Page ----------------
const Page = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedConvId, setSelectedConvId] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [messagesLoading, setMessagesLoading] = useState(false); // State for fetching conversation history

  const handleGetMessages = async (conv) => {
    try {
      setSelectedConvId(conv._id);
      setMessagesLoading(true); // Start loading when selecting conversation

      const res = await fetch(`/api/conversations/${conv._id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (data.success) setMessages(data.conversation.messages || []);
    } catch (err) {
      console.error(err);
    } finally {
      setMessagesLoading(false); // Stop loading after fetch completes
    }
  };

  const addNewMessage = async () => {
    if (!selectedConvId || !newMessage.trim()) return;

    const userMessage = newMessage.trim();

    // 1. Immediately update state with user message and AI loading placeholder
    const tempMessages = [
      ...messages,
      { role: "person", message: userMessage },
      { role: "assistant", message: LOADING_MESSAGE },
    ];
    setMessages(tempMessages);
    setNewMessage("");
    setAiLoading(true);

    try {
      const res = await fetch("/api/conversations/chat/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          convId: selectedConvId,
          role: "person",
          message: userMessage,
        }),
      });

      const data = await res.json();

      if (data.success) {
        // 2. Replace temporary messages with the final, updated conversation
        setMessages(data.conversation.messages || []);
      } else {
        // Handle failure: Revert
        setMessages(messages);
        console.error("Failed to send message:", data.error);
      }
    } catch (err) {
      // Handle error: Revert
      setMessages(messages);
      console.error(err);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] relative">
      <Sidebar handleGetMessages={handleGetMessages} user={user} />
      <div className="flex flex-col flex-1 relative">
        <Center
          messages={messages}
          selectedConvId={selectedConvId}
          messagesLoading={messagesLoading} // Pass messagesLoading
        />
        <AddNewMessage
          setNewMessage={setNewMessage}
          newMessage={newMessage}
          addNewMessage={addNewMessage}
          aiLoading={aiLoading}
          selectedConvId={selectedConvId}
        />
      </div>
    </div>
  );
};

export default Page;
