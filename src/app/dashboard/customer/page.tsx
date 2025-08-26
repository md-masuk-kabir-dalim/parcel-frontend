import React from 'react';
import Link from 'next/link';

const CustomerWelcomePage = () => {
    return (
        <div className='min-h-screen bg-green flex flex-col'>
            {/* Header Section */}
            <header className='bg-green text-white py-12 text-center'>
                <h1 className='text-5xl font-bold mb-4'>Welcome, Customer!</h1>
                <p className='text-xl'>
                    Book parcels, track deliveries, and manage your shipments easily.
                </p>
            </header>

            {/* Main Content */}
            <main className='flex-1 p-10 max-w-4xl mx-auto'>
                {/* Dashboard Info */}
                <section className='mb-12'>
                    <h2 className='text-3xl font-semibold mb-4 text-green-700'>Your Dashboard</h2>
                    <p className='text-gray-700 text-lg'>
                        Quickly view your parcel bookings, track their current status, and see
                        delivery updates in real-time. Everything you need to manage your shipments
                        is right here.
                    </p>
                </section>

                {/* Parcel Booking Info */}
                <section className='mb-12'>
                    <h2 className='text-3xl font-semibold mb-4 text-green-700'>Book a Parcel</h2>
                    <p className='text-gray-700 text-lg'>
                        Schedule a pickup, select your parcel type, and choose payment options (COD
                        or prepaid) easily. Your parcels will be handled efficiently and securely.
                    </p>
                    <Link href='/customer/book-parcel'>
                        <button className='mt-4 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition'>
                            Book a Parcel
                        </button>
                    </Link>
                </section>

                {/* Track Parcel Info */}
                <section className='mb-12'>
                    <h2 className='text-3xl font-semibold mb-4 text-green-700'>
                        Track Your Parcels
                    </h2>
                    <p className='text-gray-700 text-lg'>
                        See live updates of your parcels on the map and receive real-time
                        notifications about their current status. Stay informed every step of the
                        way.
                    </p>
                    <Link href='/customer/track-parcel'>
                        <button className='mt-4 bg-gray-200 text-gray-800 px-6 py-3 rounded-full hover:bg-gray-300 transition'>
                            Track Parcel
                        </button>
                    </Link>
                </section>

                {/* Tips Section */}
                <section className='mb-12'>
                    <h2 className='text-3xl font-semibold mb-4 text-green-700'>
                        Tips for Smooth Delivery
                    </h2>
                    <ul className='list-disc list-inside text-gray-700 text-lg space-y-2'>
                        <li>Double-check your pickup and delivery addresses.</li>
                        <li>Keep your phone handy for delivery notifications.</li>
                        <li>Ensure parcels are securely packaged.</li>
                        <li>Review delivery status regularly in your dashboard.</li>
                    </ul>
                </section>
            </main>

            {/* Footer */}
            <footer className='bg-green-600 text-white py-6 text-center'>
                &copy; {new Date().getFullYear()} Courier and Parcel Management System. All rights
                reserved.
            </footer>
        </div>
    );
};

export default CustomerWelcomePage;
