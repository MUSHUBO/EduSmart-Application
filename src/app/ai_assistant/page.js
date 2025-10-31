"use client";
import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { AuthContext } from "@/Context/AuthContext/AuthContext";
import { FaSpinner } from "react-icons/fa";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { MdMoreVert } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";

// Define a constant for the loading message key
const LOADING_MESSAGE = "__LOADING__";

// --- Sidebar ---
const Sidebar = ({
  handleGetMessages,
  user,
  showSidebar,
  initialSelectConvId,
  setNewConversationInSidebar, // ⭐️ NEW PROP
}) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [selectedConvId, setSelectedConvId] = useState(null);

  // ⭐️ NEW FUNCTION: Direct state updater to be exposed to Page
  const addConversationToState = useCallback((newConv) => {
    setConversations((prev) => [...prev, newConv]);
  }, []);

  // ⭐️ NEW useEffect to expose the updater function to the Page component
  useEffect(() => {
    if (setNewConversationInSidebar) {
      setNewConversationInSidebar(() => addConversationToState);
    }
  }, [setNewConversationInSidebar, addConversationToState]);


  // Function to fetch all conversations
  const getConversations = useCallback(async () => {
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
  }, [user]);

  // Load conversations on component mount or user change
  useEffect(() => {
    getConversations();
  }, [user, getConversations]);

  // Handle new conversation creation (used only by the manual button)
  const handleNewConversation = async () => {
    try {
      setProcessing(true);
      const res = await fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creator: user?.email }),
      });
      const data = await res.json();
      if (data.success) {
        // Add new conversation to the list manually
        setConversations((prev) => [...prev, data.conversation]);
        // Auto select the new conversation after manual creation
        setSelectedConvId(data.conversation._id);
        handleGetMessages(data.conversation);
        return data.conversation;
      }
      return null;
    } catch (err) {
      console.error(err);
      return null;
    } finally {
      setProcessing(false);
    }
  };

  const handleSelectConversation = (conv) => {
    setSelectedConvId(conv._id);
    handleGetMessages(conv);
  };

  // Auto-select newly created conversation (triggered by initialSelectConvId change)
  useEffect(() => {
    if (initialSelectConvId && conversations.length > 0) {
      const convToSelect = conversations.find(
        (c) => c._id === initialSelectConvId
      );
      if (convToSelect && convToSelect._id !== selectedConvId) {
        setSelectedConvId(convToSelect._id);
        handleGetMessages(convToSelect);
      }
    }
  }, [initialSelectConvId, conversations, handleGetMessages, selectedConvId]);

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
      handleGetMessages(null); 
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  // Delete a single conversation
  const handleDeleteConversation = async (convId) => {
    try {
      setProcessing(true);
      const res = await fetch(`/api/conversations/${convId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (data.success) {
        setConversations((prev) => prev.filter((conv) => conv._id !== convId));
        if (selectedConvId === convId) {
          setSelectedConvId(null);
          handleGetMessages(null); 
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  const handleRenamingConversation = async (convId) => {
    try {
      const newTitle = prompt("Enter a new name for this conversation:");
      if (!newTitle || !newTitle.trim()) return;

      setProcessing(true);

      const res = await fetch(`/api/conversations/${convId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle.trim() }),
      });

      const data = await res.json();

      if (data.success) {
        setConversations((prev) =>
          prev.map((conv) =>
            conv._id === convId ? { ...conv, title: newTitle.trim() } : conv
          )
        );
      } else {
        console.error("Failed to rename conversation:", data.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div
      className={`p-4 border-r border-gray-300 flex h-screen ${
        showSidebar ? "w-1/5" : "w-12"
      } flex-col bg-base-300`}
    >
      <h1 className="text-xl font-semibold mb-4 pt-20"></h1>
      <button
        className={`btn btn-soft bg-transparent btn-error w-full mb-2 ${
          showSidebar ? "flex" : "hidden"
        } items-center justify-center gap-2`}
        onClick={handleDeleteAllConversations}
      >
        Delete All Conversations
      </button>

      {loading ? (
        <div className="flex-1 flex justify-center items-center">
          <FaSpinner className="animate-spin text-2xl text-blue-500" />
        </div>
      ) : (
        <div
          className={`space-y-2 ${
            showSidebar ? "flex-1" : "hidden"
          }  overflow-y-auto flex-col-revers`}
        >
          {[...conversations]?.reverse()?.map((conv) => {
            const isSelected = conv._id === selectedConvId;
            return (
              <div key={conv._id} className="flex w-full justify-center">
                <input
                  className={`w-10/12 btn rounded-sm  border-0  ${
                    isSelected ? "bg-secondary" : "btn-outline"
                  } `}
                  onClick={() => handleSelectConversation(conv)}
                  value={
                    conv.title || new Date(conv.createdAt).toLocaleString()
                  }
                  readOnly
                />

                <div className="">
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn m-1 btn-ghost"
                    >
                      <MdMoreVert />
                    </div>
                    <ul
                      tabIndex="-1"
                      className="dropdown-content menu bg-base-100 rounded-box z-100 w-fit absolute p-2 shadow-sm"
                    >
                      <button
                        className="btn btn-ghost w-fit"
                        onClick={() => {
                          document.activeElement.blur();
                          handleDeleteConversation(conv?._id);
                        }}
                        disabled={processing}
                      >
                        <MdDeleteOutline size={20} />
                      </button>

                      <button
                        className="btn btn-ghost w-fit"
                        onClick={() => {
                          document.activeElement.blur();
                          handleRenamingConversation(conv?._id);
                        }}
                        disabled={processing}
                      >
                        <MdDriveFileRenameOutline size={20} />
                      </button>
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <button
        className={`btn btn-accent w-full mt-4 ${
          showSidebar ? "flex" : "hidden"
        } items-center justify-center gap-2`}
        onClick={handleNewConversation}
        disabled={processing}
      >
        {processing && <FaSpinner className="animate-spin" />}+ New Conversation
      </button>
    </div>
  );
};

// --- Center ---
const Center = ({ messages, selectedConvId, messagesLoading }) => {
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 0);
    return () => clearTimeout(timer);
  }, [messages, selectedConvId]);

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
        {!selectedConvId && messages.length === 0 ? (
          <p className="text-gray-500 text-center mt-[30vh] text-xl font-medium">
            Start a new conversation by typing your first message below.
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

// --- AddNewMessage ---
const AddNewMessage = ({
  setNewMessage,
  newMessage,
  addNewMessage,
  aiLoading,
}) => {
  const isDisabled = aiLoading;

  const handleSubmit = () => {
    if (isDisabled || !newMessage.trim()) return;
    addNewMessage();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !isDisabled) {
      e.preventDefault(); 
      handleSubmit();
    }
  };

  return (
    <div className="p-4 bg-background border-t border-gray-300 flex items-center justify-center gap-2 w-full">
      <input
        className="input input-bordered flex-1 bg-transparent"
        placeholder={"Write a message..."}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        value={newMessage}
        disabled={isDisabled}
      />
      <button
        className="btn btn-primary"
        onClick={handleSubmit}
        disabled={isDisabled || !newMessage.trim()}
      >
        {aiLoading && <FaSpinner className="animate-spin mr-2" />}
        Send
      </button>
    </div>
  );
};

// --- Main Page ---
const Page = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedConvId, setSelectedConvId] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const [initialSelectConvId, setInitialSelectConvId] = useState(null);
  // ⭐️ NEW STATE: Function to hold the Sidebar's setter
  const [setNewConversationInSidebar, setSetNewConversationInSidebar] = useState(null);

  // Function to create a new conversation and return its ID
  // ⭐️ MODIFIED: Accepts the sidebar update function
  const createNewConversation = async (updateSidebarConversations) => {
    try {
      const res = await fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creator: user?.email }),
      });
      const data = await res.json();
      if (data.success) {
        const newConv = data.conversation;
        
        // ⭐️ CRITICAL FIX: Update the Sidebar's state directly
        if (updateSidebarConversations) {
          updateSidebarConversations(newConv);
        }
        
        setInitialSelectConvId(newConv._id);
        setSelectedConvId(newConv._id); 
        return newConv._id;
      }
      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const handleGetMessages = async (conv) => {
    if (!conv?._id) {
      setSelectedConvId(null);
      setMessages([]);
      return;
    }

    try {
      setSelectedConvId(conv?._id);
      setMessagesLoading(true);

      const res = await fetch(`/api/conversations/${conv?._id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (data.success) setMessages(data.conversation.messages || []);
    } catch (err) {
      console.error(err);
    } finally {
      setMessagesLoading(false);
    }
  };

  const addNewMessage = async () => {
    if (!newMessage.trim()) return;

    let convId = selectedConvId;
    const userMessage = newMessage.trim();

    // ⭐️ STEP 1: Auto-create conversation if not selected
    if (!convId) {
      setAiLoading(true); 
      // ⭐️ PASS THE SIDEBAR UPDATER FUNCTION
      convId = await createNewConversation(setNewConversationInSidebar);

      if (!convId) {
        setAiLoading(false);
        console.error("Failed to create new conversation.");
        return;
      }
    }

    // 2. Immediately update state with user message and AI loading placeholder
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
          convId: convId,
          role: "person",
          message: userMessage,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMessages(data.conversation.messages || []);
      } else {
        setMessages(messages);
        console.error("Failed to send message:", data.error);
      }
    } catch (err) {
      setMessages(messages);
      console.error(err);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="flex h-screen relative">
      <button
        className="btn bg-transparent absolute top-17 left-0 text-xl"
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        {showSidebar ? <GoSidebarExpand /> : <GoSidebarCollapse />}{" "}
      </button>
      <Sidebar
        handleGetMessages={handleGetMessages}
        showSidebar={showSidebar}
        user={user}
        initialSelectConvId={initialSelectConvId}
        // ⭐️ PASS THE SETTER FUNCTION DOWN
        setNewConversationInSidebar={setSetNewConversationInSidebar} 
      />
      <div className="flex flex-col flex-1 relative">
        <Center
          messages={messages}
          selectedConvId={selectedConvId}
          messagesLoading={messagesLoading}
        />
        <AddNewMessage
          setNewMessage={setNewMessage}
          newMessage={newMessage}
          addNewMessage={addNewMessage}
          aiLoading={aiLoading}
        />
      </div>
    </div>
  );
};

export default Page;