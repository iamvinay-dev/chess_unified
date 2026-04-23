'use client';

import * as React from 'react';
import { 
  Users, 
  Trash2, 
  PlusCircle, 
  Search, 
  Loader2, 
  Save, 
  X, 
  UserPlus
} from 'lucide-react';
import { Student } from '@/lib/types';

export default function ManageStudentsPage() {
  const [students, setStudents] = React.useState<Student[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [editingId, setEditingId] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/data/students');
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (updatedStudents: Student[]) => {
    setSaving(true);
    try {
      await fetch('/api/data/students', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedStudents),
      });
      setStudents(updatedStudents);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const addStudent = () => {
    const newStudent: Student = {
      id: Date.now().toString(),
      name: 'New Student',
      level: 'Beginner',
      joined: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    };
    const newList = [newStudent, ...students];
    handleSave(newList);
    setEditingId(newStudent.id);
  };

  const deleteStudent = (id: string) => {
    if (!confirm('Are you sure you want to delete this student?')) return;
    const newList = students.filter(s => s.id !== id);
    handleSave(newList);
  };

  const updateStudent = (id: string, field: keyof Student, value: string) => {
    const newList = students.map(s => s.id === id ? { ...s, [field]: value } : s);
    setStudents(newList);
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
             <Users /> Student Management
          </h1>
          <p className="text-sm text-gray-500">Add, edit, or remove students from the academy records.</p>
        </div>
        <button
          onClick={addStudent}
          className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-primary/20"
        >
          <UserPlus size={20} />
          Add Student
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden p-8">
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or ID..." 
            className="w-full bg-gray-50 border rounded-2xl pl-12 pr-4 py-3 outline-none focus:border-primary transition-all font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid gap-4">
          {filteredStudents.map((student) => (
            <div 
              key={student.id} 
              className={cn(
                "p-6 rounded-[2rem] border transition-all relative group",
                editingId === student.id ? "bg-primary/5 border-primary" : "bg-gray-50/50 border-gray-100 hover:border-primary/20"
              )}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                   <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center font-black text-primary shadow-sm text-xl">
                      {student.name[0]}
                   </div>
                   {editingId === student.id ? (
                      <div className="space-y-2">
                        <input 
                          className="bg-white border rounded-lg px-3 py-1 font-bold outline-none focus:border-primary"
                          value={student.name}
                          onChange={(e) => updateStudent(student.id, 'name', e.target.value)}
                        />
                        <select 
                          className="block text-xs bg-white border rounded-lg px-2 py-1 outline-none"
                          value={student.level}
                          onChange={(e) => updateStudent(student.id, 'level', e.target.value as any)}
                        >
                          <option>Beginner</option>
                          <option>Intermediate</option>
                          <option>Advanced</option>
                        </select>
                      </div>
                   ) : (
                     <div>
                       <div className="font-bold text-lg">{student.name}</div>
                       <div className={cn(
                         "text-[10px] font-black uppercase tracking-widest mt-1 inline-block px-2 py-0.5 rounded-full",
                         student.level === 'Advanced' ? 'bg-orange-100 text-orange-600' : 
                         student.level === 'Intermediate' ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-500'
                       )}>
                         {student.level}
                       </div>
                     </div>
                   )}
                </div>

                <div className="flex items-center gap-4">
                   <div className="text-right hidden md:block px-6 border-r border-gray-200">
                      <div className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1">Joined</div>
                      <div className="text-sm font-bold">{student.joined}</div>
                   </div>
                   
                   <div className="flex items-center gap-2">
                      {editingId === student.id ? (
                        <button 
                          onClick={() => {
                            handleSave(students);
                            setEditingId(null);
                          }}
                          className="bg-green-500 text-white p-3 rounded-2xl hover:bg-green-600 shadow-lg"
                        >
                          <Save size={20} />
                        </button>
                      ) : (
                        <button 
                          onClick={() => setEditingId(student.id)}
                          className="bg-white text-gray-400 p-3 rounded-2xl border hover:text-primary transition-colors"
                        >
                          <FileEdit size={20} />
                        </button>
                      )}
                      <button 
                        onClick={() => deleteStudent(student.id)}
                        className="bg-white text-gray-400 p-3 rounded-2xl border hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                   </div>
                </div>
              </div>
            </div>
          ))}

          {filteredStudents.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
               <Users size={48} className="mx-auto text-gray-200 mb-4" />
               <p className="text-gray-400 font-bold">No students found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper icons
function FileEdit(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z" />
    </svg>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}
