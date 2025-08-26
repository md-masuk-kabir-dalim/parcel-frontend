Courier and Parcel Management System (Frontend)
Overview

This is the frontend for the Courier and Parcel Management System, built using Next.js.

It provides a responsive web app for Admin, Delivery Agent, and Customer roles, integrating with the backend APIs for parcel management, real-time updates (via SSE), and user authentication.

Features
Common Features

Responsive UI built with Next.js + React

JWT authentication with role-based access control

File uploads for profile images and parcel images

Real-time notifications and parcel tracking via SSE

Customer

Register/Login

Book parcel pickups with pickup & delivery addresses, parcel type/size, COD or prepaid

View booking history & status

Track parcel location in real-time on a map

Delivery Agent

View assigned parcels

Update parcel status (Picked Up, In Transit, Delivered, Failed)

Optimized delivery routes with Google Maps integration

Admin

Dashboard with parcel metrics: daily bookings, failed deliveries, COD amounts

Assign agents to parcels

Manage all users and bookings

Analytics visualization: summary, monthly revenue, top customers, top agents

Tech Stack

Framework: Next.js

Styling: Tailwind CSS / or CSS modules

State Management: React Context API / Redux (if applicable)

HTTP Requests: Axios / Fetch API

Real-time: SSE (Server-Sent Events) for parcel & agent updates

Map Integration: Google Maps API

Authentication: JWT + Backend APIs

Key Pages

Login/Register: User authentication

Dashboard: Admin analytics, parcel overview

Parcel Booking: Customer parcel booking form

Parcel Tracking: Real-time map updates via SSE

Assigned Parcels: Delivery agent view of assigned parcels

User Management: Admin view to manage users