import React, { useState } from 'react';
import { Plus, Trash2, Calendar } from 'lucide-react';
import TodoList from './components/TodoList';
import Timetable from './components/Timetable';

function App() {
  const [activeTab, setActiveTab] = useState<'todos' | 'timetable'>('todos');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-purple-800">Anmol's To Do</h1>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex border-b">
              <button
                className={`flex-1 py-4 text-center font-medium ${
                  activeTab === 'todos'
                    ? 'bg-purple-500 text-white'
                    : 'text-gray-600 hover:bg-purple-50'
                }`}
                onClick={() => setActiveTab('todos')}
              >
                <Plus className="inline-block mr-2" size={20} />
                Todo List
              </button>
              <button
                className={`flex-1 py-4 text-center font-medium ${
                  activeTab === 'timetable'
                    ? 'bg-purple-500 text-white'
                    : 'text-gray-600 hover:bg-purple-50'
                }`}
                onClick={() => setActiveTab('timetable')}
              >
                <Calendar className="inline-block mr-2" size={20} />
                Timetable
              </button>
            </div>
            
            <div className="p-6">
              {activeTab === 'todos' ? <TodoList /> : <Timetable />}
            </div>
          </div>
        </div>
      </div>
      <footer className="text-center py-4 text-gray-600">
        Made with ❤️ by Arsh | © {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;
