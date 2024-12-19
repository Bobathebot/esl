import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = Calendar.momentLocalizer(moment);

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("https://esl-an62.onrender.com/api/exams");
        const formattedEvents = response.data.map((exam) => ({
          title: `Exam: ${exam.link}`,
          start: new Date(exam.deadline),
          end: new Date(exam.deadline),
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching exams for calendar:", error);
        setError("Failed to load calendar events.");
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Exam Calendar</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          eventPropGetter={(event) => {
            const backgroundColor = "#f59e0b"; // Yellow color
            return { style: { backgroundColor } };
          }}
        />
      </div>
    </div>
  );
};

export default CalendarPage;
