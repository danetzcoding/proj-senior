import React, { useState, useEffect } from 'react';
import './Calendar.css';

const Calendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);
  const [events, setEvents] = useState({});
  const [newEvent, setNewEvent] = useState('');
  const [adminAccess, setAdminAccess] = useState(false);

  const formatDate = (date) => date.toISOString().split('T')[0];

  useEffect(() => {
    const fetchMonthEvents = async () => {
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      try {
        const res = await fetch(`http://localhost:5000/events?month=${year}-${month}`);
        const data = await res.json();

        const grouped = {};
        data.forEach(ev => {
          if (!grouped[ev.date]) grouped[ev.date] = [];
          grouped[ev.date].push(ev);
        });

        setEvents(grouped);
      } catch (err) {
        console.error('Error fetching month events:', err);
      }
    };

    fetchMonthEvents();
  }, [currentDate]);

  const handleAddEvent = async () => {
    if (!newEvent.trim()) return;
    const dateStr = formatDate(selectedDate);

    try {
      const res = await fetch('http://localhost:5000/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: dateStr, description: newEvent }),
      });
      const saved = await res.json();

      setEvents((prev) => ({
        ...prev,
        [dateStr]: prev[dateStr] ? [...prev[dateStr], saved] : [saved],
      }));
      setNewEvent('');
    } catch (err) {
      console.error('Error saving event:', err);
    }
  };

  const handleDeleteEvent = async (eventId, eventDate) => {
    try {
      const res = await fetch(`http://localhost:5000/events/${eventId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setEvents((prev) => ({
          ...prev,
          [eventDate]: prev[eventDate].filter(ev => ev._id !== eventId),
        }));
      } else {
        console.error('Failed to delete event');
      }
    } catch (err) {
      console.error('Error deleting event:', err);
    }
  };

  const getMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days = [];
    const startDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= totalDays; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const changeMonth = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  const handleAdminLogin = () => {
    const password = prompt("Enter admin password:");
    if (password === 'admin123') {
      setAdminAccess(true);
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <div className="calendar">
      <h1>
        {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
      </h1>

      <div className="calendar-nav">
        <button onClick={() => changeMonth(-1)}>Previous</button>
        <button onClick={() => changeMonth(1)}>Next</button>
        {!adminAccess && (
          <button onClick={handleAdminLogin} style={{ marginLeft: '20px' }}>
            Admin Access
          </button>
        )}
      </div>

      <div className="calendar-grid" style={{ minWidth: '700px' }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className="calendar-header">{d}</div>
        ))}

        {getMonthDays().map((date, idx) => {
          const isToday = date && formatDate(date) === formatDate(today);
          const isSelected = date && formatDate(date) === formatDate(selectedDate);
          const dateStr = date ? formatDate(date) : null;
          const dayEvents = dateStr && events[dateStr] ? events[dateStr] : [];

          return (
            <div
              key={idx}
              className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
              onClick={() => date && setSelectedDate(date)}
              style={{ minHeight: '120px', padding: '5px', overflowY: 'auto' }}
            >
              <div className="date-number">{date ? date.getDate() : ''}</div>
              {dayEvents.map(ev => (
                <div key={ev._id} className="event-item">
                  {ev.description}
                  {adminAccess && (
                    <button
                      className="delete-event-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteEvent(ev._id, dateStr);
                      }}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <div className="calendar-events">
        <h2>Events on {formatDate(selectedDate)}</h2>
        {events[formatDate(selectedDate)] && events[formatDate(selectedDate)].length > 0 ? (
          <ul>
            {events[formatDate(selectedDate)].map((e) => (
              <li key={e._id}>
                {e.description}
                {adminAccess && (
                  <button
                    className="delete-event-btn"
                    onClick={() => handleDeleteEvent(e._id, formatDate(selectedDate))}
                  >
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No events yet.</p>
        )}

        {adminAccess && (
          <div className="calendar-add-event">
            <input
              type="text"
              placeholder="Add event..."
              value={newEvent}
              onChange={(e) => setNewEvent(e.target.value)}
            />
            <button onClick={handleAddEvent}>Add</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
