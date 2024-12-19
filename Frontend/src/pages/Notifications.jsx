import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("https://esl-an62.onrender.com");

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("https://esl-an62.onrender.com/api/notifications");
        setNotifications(response.data);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
        setError("Failed to load notifications.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const onConnect = () => {
      console.log("Socket connected with ID:", socket.id);
    };

    const onNewSubmission = (data) => {
      console.log("Notifications received newSubmission event:", data);
      const newNotif = {
        _id: Date.now().toString(),
        message: `New submission from ${data.studentName} (${data.studentEmail})`,
        read: false,
        createdAt: new Date(data.submittedAt).toISOString(),
      };
      setNotifications((prev) => [newNotif, ...prev]);
    };

    socket.on("connect", onConnect);
    socket.on("newSubmission", onNewSubmission);

    return () => {
      socket.off("connect", onConnect);
      socket.off("newSubmission", onNewSubmission);
    };
  }, []);

  const markAsRead = async (id) => {
    try {
      await axios.patch(`https://esl-an62.onrender.com/api/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((notif) =>
          notif._id === id ? { ...notif, read: true } : notif
        )
      );
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
      alert("Failed to mark notification as read.");
    }
  };

  const deleteNotification = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this notification?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://esl-an62.onrender.com/api/notifications/${id}`);
      setNotifications((prev) => prev.filter((notif) => notif._id !== id));
    } catch (err) {
      console.error("Failed to delete notification:", err);
      alert("Failed to delete notification.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      {loading ? (
        <p>Loading notifications...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((notif) => (
            <div
              key={notif._id}
              className={`p-4 rounded-lg shadow-md flex justify-between items-center ${
                notif.read ? "bg-white" : "bg-yellow-100"
              }`}
            >
              <div>
                <p className="text-gray-800 font-medium">{notif.message}</p>
                <p className="text-gray-500 text-sm">
                  {new Date(notif.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex space-x-2">
                {!notif.read && (
                  <button
                    onClick={() => markAsRead(notif._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-full text-sm hover:bg-green-600"
                  >
                    Mark as Read
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notif._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-full text-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
