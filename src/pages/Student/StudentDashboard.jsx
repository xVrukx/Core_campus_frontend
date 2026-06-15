// src/pages/StudentDashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserData, ProtectedRoute } from "../../RouteProtect";
import { Navbar } from "../../components/NavBar";
import { ClipboardCheck, FileText, Calendar, GraduationCap, FolderOpen, Bell, Award } from "lucide-react";

export const StudentDashboard = () => {
  const user = getUserData();

const features = [
  {
    name: "Attendance",
    path: "/attendance",
    icon: ClipboardCheck,
  },
  {
    name: "Results",
    path: "/results",
    icon: GraduationCap,
  },
  {
    name: "Timetable",
    path: "/timetable",
    icon: Calendar,
  },
  {
    name: "Exam & Hall Ticket",
    path: "/exam",
    icon: FileText,
  },
  {
    name: "Files",
    path: "/files",
    icon: FolderOpen,
  },
  {
    name: "Announcements",
    path: "/announcements",
    icon: Bell,
  },
  {
    name: "Credits",
    path: "/credits",
    icon: Award,
  },
];

  const [theory, setTheory] = useState("--");
  const [practical, setPractical] = useState("--");
  const [total, setTotal] = useState("--");

  const fetchAttendanceSummary = async () => {
    try {
      if (!user?.name) return;

      const res = await fetch(
        `https://core-campus-backend.onrender.com/student/dashboard/${encodeURIComponent(user.name)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch attendance summary");
      }

      const data = await res.json();

      setTheory(data.theory ?? "--");
      setPractical(data.practical ?? "--");
      setTotal(data.total ?? "--");
    } catch (error) {
      console.error("Attendance summary fetch error:", error);
    }
  };

  useEffect(() => {
    fetchAttendanceSummary();
  }, [user?.name]);

  return (
    <ProtectedRoute allowedRole="student">
      <Navbar/>
      <div className="min-h-screen bg-[#121212] text-[#E0E0E0] p-4">
        <div className="bg-[#1E1E1E] rounded-2xl shadow-lg p-5 text-center mb-4">
          <h1 className="text-3xl font-bold text-[#007AFF]">CampusCore</h1>
          <p className="text-[#8E8E93] mt-2">Welcome, {user?.name}</p>
        </div>

        <div className="bg-[#1E1E1E] rounded-2xl shadow-lg p-5 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-[#FF9500]">
            Attendance Summary
          </h2>

          <div className="grid grid-cols-3 text-center gap-4">
            <div>
              <p className="text-[#8E8E93]">Theory</p>
              <p className="text-2xl font-bold">{theory}</p>
            </div>

            <div>
              <p className="text-[#8E8E93]">Practical</p>
              <p className="text-2xl font-bold">{practical}</p>
            </div>

            <div>
              <p className="text-[#8E8E93]">Total</p>
              <p className="text-2xl font-bold text-[#007AFF]">{total}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Link
                key={feature.name}
                to={feature.path}
                className="
                  relative
                  w-32
                  h-32
                  bg-[#1E1E1E]
                  rounded-2xl
                  border
                  border-[#2A2A2A]
                  hover:border-[#007AFF]
                  hover:bg-[#242424]
                  transition-all
                  duration-300
                  group
                "
              >
                <Icon
                  size={22}
                  className="
                    absolute
                    top-3
                    right-3
                    text-[#007AFF]
                  "
                />

                <div className="flex h-full items-center justify-center px-2">
                  <span className="text-sm font-medium text-center">
                    {feature.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </ProtectedRoute>
  );
};