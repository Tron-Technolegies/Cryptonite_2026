import React, { useState, useEffect } from "react";
import ProfileSidebar from "../components/userprofile/ProfileSidebar";
import ProfileHeader from "../components/userprofile/ProfileHeader";
import PersonalInfo from "../components/userprofile/PersonalInfo";
import AddressSection from "../components/userprofile/AddressSection";
import SecuritySection from "../components/userprofile/SecuritySection";
import PreferencesSection from "../components/userprofile/PreferencesSection";
import OrderHistory from "../components/userprofile/OrderHistory";
import api from "../api/api";
import Loading from "../components/ui/Loading";
import { adaptUser } from "../utils/userAdapter";

// Dummy Data
const dummyUser = {
  name: "Max Müller",
  firstName: "Max",
  lastName: "Müller",
  email: "max.mueller@example.com",
  phone: "+0123456789",
  location: "Regensburg, Germany",
  memberSince: "January 2023",
};

const dummyAddresses = [
  {
    id: 1,
    type: "Home",
    isDefault: true,
    street: "123 Main Street",
    city: "Regensburg",
    state: "Bavaria",
    zip: "93047",
    country: "Germany",
  },
  {
    id: 2,
    type: "Office",
    isDefault: false,
    street: "456 Business Ave",
    city: "Munich",
    state: "Bavaria",
    zip: "80331",
    country: "Germany",
  },
];

const dummyOrders = [
  {
    id: "ORD-2025-001",
    date: "Dec 15, 2025",
    status: "Completed",
    total: "9,900",
    items: [
      {
        name: "Antminer S19 Pro",
        quantity: 2,
        price: "3,200",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100&h=100&fit=crop",
      },
      {
        name: "Whatsminer M30S++",
        quantity: 1,
        price: "3,500",
        image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=100&h=100&fit=crop",
      },
    ],
  },
  {
    id: "ORD-2025-002",
    date: "Dec 10, 2025",
    status: "Completed",
    total: "3,200",
    items: [
      {
        name: "Antminer S19 Pro",
        quantity: 2,
        price: "3,200",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100&h=100&fit=crop",
      },
    ],
  },
  {
    id: "ORD-2025-003",
    date: "Dec 5, 2025",
    status: "Processing",
    total: "12,500",
    items: [
      {
        name: "Antminer S19 Pro",
        quantity: 3,
        price: "3,200",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100&h=100&fit=crop",
      },
      {
        name: "Whatsminer M30S++",
        quantity: 2,
        price: "3,500",
        image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=100&h=100&fit=crop",
      },
    ],
  },
];

export default function UserProfile() {
  const [activeSection, setActiveSection] = useState("personal");
  const [user, setUser] = useState(null);

  useEffect(() => {
    api
      .get("/auth/me/")
      .then((res) => {
        setUser(adaptUser(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api
      .get("/orders/my-orders/")
      .then((res) => setOrders(res.data))
      .catch(() => setOrders([]));
  }, []);

  if (!user) return <Loading />;

  const renderSection = () => {
    switch (activeSection) {
      case "personal":
        return <PersonalInfo user={user} />;
      case "address":
        return <AddressSection />;
      case "security":
        return <SecuritySection />;
      case "preferences":
        return <PreferencesSection />;
      case "orders":
        return <OrderHistory orders={orders} />;
      default:
        return <PersonalInfo user={user} />;
    }
  };

  return (
    <div className="container-x py-8">
      <div className="mb-6">
        <h1 className="josefin-sans text-5xl font-bold text-gray-900">MY PROFILE</h1>
        <p className="text-gray-600 mt-2">
          Manage your account settings, addresses, and preferences.
        </p>
      </div>

      <hr className="border-gray-300 mb-8" />

      <ProfileHeader user={user} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Fixed on larger screens */}
        <div className="lg:col-span-1">
          <ProfileSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">{renderSection()}</div>
      </div>
    </div>
  );
}
