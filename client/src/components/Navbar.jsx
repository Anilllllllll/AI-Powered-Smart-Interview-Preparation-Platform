import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, LayoutDashboard, User } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-xl font-bold text-indigo-600 flex items-center gap-2">
                            AI Interview Prep
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600 flex items-center gap-1">
                                    <LayoutDashboard size={18} /> Dashboard
                                </Link>
                                <span className="text-gray-500 text-sm flex items-center gap-1">
                                    <User size={18} /> {user.name}
                                </span>
                                <button onClick={handleLogout} className="text-red-500 hover:text-red-700 flex items-center gap-1">
                                    <LogOut size={18} /> Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-700 hover:text-indigo-600">Login</Link>
                                <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
