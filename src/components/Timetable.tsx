import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface TimetableEntry {
  _id: string;
  day: string;
  time: string;
  activity: string;
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Timetable = () => {
  const [entries, setEntries] = useState<TimetableEntry[]>([]);
  const [newEntry, setNewEntry] = useState({
    day: '',
    time: '',
    activity: '',
  });

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await fetch('https://to-do-list-using-mern-zm8v.vercel.app/api/timetables');
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error('Error fetching timetable entries:', error);
    }
  };

  const addEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.day || !newEntry.time || !newEntry.activity) return;

    try {
      const response = await fetch('https://to-do-list-using-mern-zm8v.vercel.app/api/timetables', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEntry),
      });
      const data = await response.json();
      setEntries([...entries, data]);
      setNewEntry({ day: '', time: '', activity: '' });
    } catch (error) {
      console.error('Error adding timetable entry:', error);
    }
  };

  const deleteEntry = async (id: string) => {
    try {
      await fetch(`https://to-do-list-using-mern-zm8v.vercel.app/api/timetables/${id}`, {
        method: 'DELETE',
      });
      setEntries(entries.filter(entry => entry._id !== id));
    } catch (error) {
      console.error('Error deleting timetable entry:', error);
    }
  };

  return (
    <div>
      <form onSubmit={addEntry} className="mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={newEntry.day}
            onChange={(e) => setNewEntry({ ...newEntry, day: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select Day</option>
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          <input
            type="time"
            value={newEntry.time}
            onChange={(e) => setNewEntry({ ...newEntry, time: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            value={newEntry.activity}
            onChange={(e) => setNewEntry({ ...newEntry, activity: e.target.value })}
            placeholder="Activity"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          type="submit"
          className="w-full px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <Plus className="inline-block mr-2" size={20} />
          Add to Timetable
        </button>
      </form>

      <div className="space-y-3">
        {entries.map((entry) => (
          <div
            key={entry._id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <span className="font-medium text-purple-600">{entry.day}</span>
              <span className="mx-2 text-gray-400">|</span>
              <span className="text-gray-600">{entry.time}</span>
              <span className="mx-2 text-gray-400">|</span>
              <span className="text-gray-800">{entry.activity}</span>
            </div>
            <button
              onClick={() => deleteEntry(entry._id)}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timetable;