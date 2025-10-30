"use client";
import { useState, useContext } from "react";
import { AuthContext } from "@/Context/AuthContext/AuthContext";
import { Edit, LogOut, Camera, User } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function MyProfile() {
  const { user, logoutAccount, profileUpdateNamePhoto } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [avatar, setAvatar] = useState(user?.photoURL || "/default-avatar.png");
  const router = useRouter();

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      await profileUpdateNamePhoto({ displayName: name, photoURL: avatar });
      alert("Profile updated successfully!");
      setEditing(false);
    } catch (error) {
      console.error(error);
      alert("Failed to update profile: " + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutAccount();
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Logout failed: " + error.message);
    }
  };

  if (!user) return <p className="text-center mt-10">Loading user info...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 md:p-12 bg-background text-foreground transition-colors duration-500">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold mb-10 flex items-center justify-center gap-2 text-primary"
      >
        <User size={28} /> My Profile
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-3xl p-8 rounded-2xl shadow-lg transition-colors duration-500"
        style={{ backgroundColor: "var(--card-foreground)" }}
      >
        <div className="flex flex-col items-center gap-6">
          {/* Profile Image */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary"
          >
            <Image
              src={avatar}
              alt="Profile"
              fill
              className="object-cover rounded-full"
            />
            {editing && (
              <label className="absolute bottom-1 right-1 bg-primary p-2 rounded-full cursor-pointer hover:bg-primary/80 transition-colors duration-300">
                <Camera size={18} className="text-card-foreground" />
                <input type="file" className="hidden" onChange={handleAvatarChange} />
              </label>
            )}
          </motion.div>

          {/* User Info */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col w-full space-y-4"
          >
            <div className="w-full">
              <label className="block text-muted-foreground font-medium mb-1">
                Name
              </label>
              {editing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input input-bordered w-full"
                />
              ) : (
                <p className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-center">{name}</p>
              )}
            </div>

            <div className="w-full">
              <label className="block text-muted-foreground font-medium mb-1">
                Email
              </label>
              <p className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-center">{user.email}</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4 justify-center flex-wrap">
              {editing ? (
                <motion.button
                  onClick={handleSave}
                  whileHover={{ scale: 1.05 }}
                  className="btn btn-primary gap-2"
                >
                  <Edit size={18} /> Save
                </motion.button>
              ) : (
                <motion.button
                  onClick={() => setEditing(true)}
                  whileHover={{ scale: 1.05 }}
                  className="btn btn-primary gap-2"
                >
                  <Edit size={18} /> Edit Profile
                </motion.button>
              )}
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                className="btn btn-secondary gap-2"
              >
                <LogOut size={18} /> Logout
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}