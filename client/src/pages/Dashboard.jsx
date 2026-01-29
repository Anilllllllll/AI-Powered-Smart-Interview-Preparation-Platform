import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Award, Code, BookOpen } from 'lucide-react';

const Dashboard = () => {
    const [domains, setDomains] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDomains = async () => {
            try {
                // Normally fetch from backend
                // const res = await api.get('/interview/domains');
                // setDomains(res.data);

                // MOCK DATA for now as we might not have seeded DB yet
                setDomains([
                    { _id: '1', name: 'DSA', description: 'Data Structures & Algorithms', icon: 'Code' },
                    { _id: '2', name: 'MERN Stack', description: 'MongoDB, Express, React, Node', icon: 'BookOpen' },
                    { _id: '3', name: 'Java', description: 'Core Java & OOPs', icon: 'Code' },
                    { _id: '4', name: 'HR Interview', description: 'Behavioral & Situational', icon: 'Award' }
                ]);
            } catch (err) {
                console.error(err);
            }
        };
        fetchDomains();
    }, []);

    const startInterview = (domainId) => {
        navigate(`/interview/${domainId}`);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Welcome to Your Prep Dashboard</h1>

            {/* Stats Overview */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Interviews Completed</h3>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">12</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Avg. AI Score</h3>
                    <p className="text-3xl font-bold text-green-600 mt-2">7.8/10</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Focus Area</h3>
                    <p className="text-xl font-bold text-purple-600 mt-2">Dynamic Programming</p>
                </div>
            </section>

            <h2 className="text-xl font-semibold text-gray-800 mt-8">Start Preparation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {domains.map((domain) => (
                    <div key={domain._id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border-t-4 border-indigo-500" onClick={() => startInterview(domain._id)}>
                        <h3 className="text-lg font-bold text-gray-800">{domain.name}</h3>
                        <p className="text-gray-500 text-sm mt-2">{domain.description}</p>
                        <button className="mt-4 w-full bg-indigo-50 text-indigo-600 py-2 rounded-md font-medium hover:bg-indigo-100">Practise Now</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
