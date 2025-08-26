import React from 'react';
import Link from 'next/link';

const AgentWelcomePage = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      
      {/* Header Section */}
      <header className="bg-blue-600 text-white py-12 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome, Agent!</h1>
        <p className="text-xl">Manage your parcels, track deliveries, and stay updated in real-time.</p>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-10 max-w-4xl mx-auto">
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-blue-700">Your Dashboard</h2>
          <p className="text-gray-700 text-lg">
            Here you can view your assigned parcels, update delivery statuses, and keep track of your progress throughout the day. Stay organized and ensure timely deliveries for our customers.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-blue-700">Real-time Updates</h2>
          <p className="text-gray-700 text-lg">
            Receive notifications for new assignments, changes in parcel status, and location updates directly on your dashboard. You will always know which parcels need your attention.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-blue-700">Get Started</h2>
          <p className="text-gray-700 text-lg mb-6">
            Click below to view your assigned parcels or update your profile details.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/agent/parcel">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
                View Assigned Parcels
              </button>
            </Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-blue-700">Tips for Efficient Delivery</h2>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
            <li>Check your parcel list at the start of each day.</li>
            <li>Update the status immediately after each delivery.</li>
            <li>Communicate with customers when necessary.</li>
            <li>Use the optimized route to save time and fuel.</li>
          </ul>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6 text-center">
        &copy; {new Date().getFullYear()} Courier and Parcel Management System. All rights reserved.
      </footer>
    </div>
  );
};

export default AgentWelcomePage;
