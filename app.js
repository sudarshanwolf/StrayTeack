import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const DogManagementSystem = () => {
    const [dogData, setDogData] = useState(null);

    const firebaseConfig = {
        apiKey: "AIzaSyAl7LSK_oJd1d8XgYeUsXXSQ2TrhyaN_AQ",
        authDomain: "straydog-management.firebaseapp.com",
        projectId: "straydog-management",
        storageBucket: "straydog-management.firebasestorage.app",
        messagingSenderId: "35656558047",
        appId: "1:35656558047:web:dbfb4f5e7ba6cc0bbd106a",
        measurementId: "G-RMCQT24DML"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dogId = e.target.dogId.value.trim();

        if (!dogId) {
            alert('Please enter a valid DOGID');
            return;
        }

        const q = query(collection(db, "dogDetails"), where("DOGID", "==", dogId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            alert('No dog found with this ID');
            return;
        }

        querySnapshot.forEach((doc) => {
            setDogData(doc.data());
        });
    };

    const renderTable = (data) => {
        const sections = {
            "Basic Information": ["DOGID", "Name", "Breed", "Color", "Age", "Owner", "OwnerContact", "Location", "LastSeen"],
            "Health Information": ["Diseases", "Vaccinated", "SpayedNeutered", "HealthConditions", "Medications", "Dewormed", "FleaTickTreatment", "Allergies"],
            "ABC Program": ["ABCProgramParticipant", "ABCDate", "ABCClinic"],
            "Rescue & Adoption": ["RescueStatus", "RescueOrganization", "FosterHistory", "AdoptionReady", "AdoptionRequirements"],
            "Location & Tracking": ["GPSLocation", "FrequencyOfSightings", "Tagged", "MapLink"],
            "Additional Information": ["DietaryPreferences", "ExerciseNeeds", "ReasonForStray", "CommunityFeedback", "StatusUpdates", "LegalStatus"]
        };

        return Object.entries(sections).map(([sectionName, fields]) => (
            <div key={sectionName} className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-700">{sectionName}</h3>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <tbody className="divide-y divide-gray-200">
                            {fields.map(field => (
                                <tr key={field} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-1/3">
                                        {field.replace(/([A-Z])/g, ' $1').trim()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-500 w-2/3">
                                        {Array.isArray(data[field])
                                            ? data[field].join(', ') || 'N/A'
                                            : data[field] || 'N/A'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        ));
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Stray Dog Management System</h1>
                    <p className="mt-2 text-gray-600">Enter a Dog ID to view details</p>
                </div>

                <div className="bg-white rounded-lg shadow px-6 py-8 mb-8">
                    <form onSubmit={handleSubmit} className="flex gap-4">
                        <input
                            type="text"
                            name="dogId"
                            placeholder="Enter Dog ID"
                            className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Search
                        </button>
                    </form>
                </div>

                {dogData && (
                    <div className="animate-fade-in">
                        {renderTable(dogData)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DogManagementSystem;