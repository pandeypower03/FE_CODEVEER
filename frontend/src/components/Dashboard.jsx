import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  Target, 
  Clock, 
  TrendingUp, 
  Calendar,
  Code,
  Users,
  Award,
  CheckCircle,
  Play
} from 'lucide-react';

const handleClick = () => {
  localStorage.removeItem('token');
  window.location.href = '/login'; // Redirect to login page
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    problemsSolved: 47,
    totalProblems: 150,
    currentStreak: 7,
    longestStreak: 12,
    easyCompleted: 25,
    mediumCompleted: 18,
    hardCompleted: 4,
    interviewsCompleted: 3,
    upcomingInterviews: 1
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'problem', title: 'Two Sum', difficulty: 'easy', status: 'solved', time: '2 hours ago' },
    { id: 2, type: 'interview', title: 'Mock Interview with Google', status: 'completed', time: '1 day ago' },
    { id: 3, type: 'problem', title: 'Valid Parentheses', difficulty: 'medium', status: 'attempted', time: '2 days ago' },
    { id: 4, type: 'achievement', title: 'Week Warrior', description: 'Solved problems for 7 consecutive days', time: '3 days ago' }
  ]);

  const [upcomingInterviews, setUpcomingInterviews] = useState([
    {
      id: 1,
      company: 'Microsoft',
      type: 'Technical Interview',
      date: '2024-06-22',
      time: '2:00 PM',
      interviewer: 'Sarah Johnson'
    }
  ]);

  const completionPercentage = Math.round((stats.problemsSolved / stats.totalProblems) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Guest!</h1>
        <p className="text-gray-600">Keep up the great work on your coding journey</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Problems Solved</p>
              <p className="text-2xl font-bold text-gray-900">{stats.problemsSolved}</p>
              <p className="text-xs text-gray-500">out of {stats.totalProblems}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Code className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{completionPercentage}% complete</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Current Streak</p>
              <p className="text-2xl font-bold text-gray-900">{stats.currentStreak}</p>
              <p className="text-xs text-gray-500">days in a row</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <Trophy className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-600">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>Best: {stats.longestStreak} days</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Interviews</p>
              <p className="text-2xl font-bold text-gray-900">{stats.interviewsCompleted}</p>
              <p className="text-xs text-gray-500">completed</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{stats.upcomingInterviews} upcoming</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Achievements</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-xs text-gray-500">badges earned</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-600">
            <Target className="h-4 w-4 mr-1" />
            <span>3 more to unlock</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress by Difficulty */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress by Difficulty</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-green-600">Easy</span>
                <span className="text-sm text-gray-600">{stats.easyCompleted}/50</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${(stats.easyCompleted / 50) * 100}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-yellow-600">Medium</span>
                <span className="text-sm text-gray-600">{stats.mediumCompleted}/70</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: `${(stats.mediumCompleted / 70) * 100}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-red-600">Hard</span>
                <span className="text-sm text-gray-600">{stats.hardCompleted}/30</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${(stats.hardCompleted / 30) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <Link 
            to="/problems" 
            className="mt-4 block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Practice More Problems
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          
          <div className="space-y-4">
            {recentActivity.map(activity => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  {activity.type === 'problem' && (
                    <div className={`p-2 rounded-full ${
                      activity.status === 'solved' ? 'bg-green-100' : 'bg-yellow-100'
                    }`}>
                      {activity.status === 'solved' ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Play className="h-4 w-4 text-yellow-600" />
                      )}
                    </div>
                  )}
                  {activity.type === 'interview' && (
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                  )}
                  {activity.type === 'achievement' && (
                    <div className="p-2 bg-purple-100 rounded-full">
                      <Award className="h-4 w-4 text-purple-600" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.title}
                  </p>
                  {activity.difficulty && (
                    <p className="text-xs text-gray-500 capitalize">
                      {activity.difficulty} • {activity.status}
                    </p>
                  )}
                  {activity.description && (
                    <p className="text-xs text-gray-500">{activity.description}</p>
                  )}
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Interviews */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Interviews</h3>
          
          {upcomingInterviews.length > 0 ? (
            <div className="space-y-4">
              {upcomingInterviews.map(interview => (
                <div key={interview.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{interview.company}</h4>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {interview.type}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {interview.date} at {interview.time}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      with {interview.interviewer}
                    </div>
                  </div>
                  <button className="mt-3 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors text-sm">
                    Join Interview
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm mb-4">No upcoming interviews</p>
              <Link 
                to="/interviews" 
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
              >
                Schedule Interview
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            to="/problems" 
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
          >
            <div className="text-center">
              <Code className="h-8 w-8 text-gray-400 group-hover:text-blue-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600 group-hover:text-blue-600">
                Solve Problems
              </p>
            </div>
          </Link>
          
          <Link 
            to="/interviews" 
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group"
          >
            <div className="text-center">
              <Users className="h-8 w-8 text-gray-400 group-hover:text-green-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600 group-hover:text-green-600">
                Practice Interview
              </p>
            </div>
          </Link>
          
          <Link 
            to="/profile" 
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors group"
          >
            <div className="text-center">
              <Trophy className="h-8 w-8 text-gray-400 group-hover:text-purple-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600 group-hover:text-purple-600">
                View Achievements
              </p>
            </div>
          </Link>
             <button onClick={handleClick}>
        Logout
      </button>
        </div>
      </div>
    </div>
  );
};
