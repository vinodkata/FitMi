import { useState, useEffect, useContext } from "react";
import { fetchHealthRecords, deleteHealthRecord } from "../services/api";
import AddHealthRecord from "./AddHealthRecord";
import SearchBar from "./SearchBar";
import RecordModal from "./RecordModal";
import "../index.css";
import { UserContext } from '../context/UserContext';

function Dashboard({ userId }) {
    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [highlightedRecord, setHighlightedRecord] = useState(null);
    const [isGlowing, setIsGlowing] = useState(false);


    // Fetch records on component mount
    useEffect(() => {
        const fetchRecords = async () => {
            const data = await fetchHealthRecords(userId);
            setRecords(data);
            setFilteredRecords(data);
        };

        fetchRecords();
    }, []);

    // Handle view modal
    const handleView = (record) => {
        setSelectedRecord(record);
        setIsModalOpen(true);
    };

    // Handle delete record
    const handleDelete = async (id, deleRecord) => {
        await deleteHealthRecord(id,deleRecord);
        setRecords(records.filter((record) => record._id !== id));
        setFilteredRecords(filteredRecords.filter((record) => record._id !== id));
    };

    // Handle search functionality
    const handleSearch = (searchTerm, filterType) => {
        let results = records;
        if (searchTerm) {
            results = results.filter((record) => {
                if (filterType === "date") {
                    return record.date.includes(searchTerm);
                } else if (filterType === "heartRate") {
                    return record.heartRate.toString().includes(searchTerm);
                } else if (filterType === "bodyTemperature") {
                    return record.bodyTemperature.toString().includes(searchTerm);
                } else if (filterType === "bloodPressure") {
                    return (
                        record.bloodPressure.systolic.toString().includes(searchTerm) ||
                        record.bloodPressure.diastolic.toString().includes(searchTerm)
                    );
                }
                else if (filterType === "bmi") {
                    return record.bmi.toString().includes(searchTerm);
                }
                return false;
            });
        }
        setFilteredRecords(results);
    };

    // Handle sorting functionality
    const handleSort = (field) => {
        const sortedRecords = [...filteredRecords].sort((a, b) => {
            if (field === "date") {
                return sortOrder === "asc"
                    ? new Date(a.date) - new Date(b.date)
                    : new Date(b.date) - new Date(a.date);
            } else if (field === "heartRate") {
                return sortOrder === "asc"
                    ? a.heartRate - b.heartRate
                    : b.heartRate - a.heartRate;
            } else if (field === "bodyTemperature") {
                return sortOrder === "asc"
                    ? a.bodyTemperature - b.bodyTemperature
                    : b.bodyTemperature - a.bodyTemperature;
            } else if (field === "bloodPressure") {
                return sortOrder === "asc"
                    ? a.bloodPressure.systolic - b.bloodPressure.systolic ||
                    a.bloodPressure.diastolic - b.bloodPressure.diastolic
                    : b.bloodPressure.systolic - a.bloodPressure.systolic ||
                    b.bloodPressure.diastolic - a.bloodPressure.diastolic;
            }
            else if (field === "bmi") {
                return sortOrder === "asc"
                    ? a.bmi - b.bmi
                    : b.bmi - a.bmi;
            }
            return 0;
        });
        setFilteredRecords(sortedRecords);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    // Handle record updates
    const handleUpdateRecord = (updatedRecord) => {
        setRecords((prevRecords) =>
            prevRecords.map((record) =>
                record._id === updatedRecord._id ? updatedRecord : record
            )
        );
        setFilteredRecords((prevRecords) =>
            prevRecords.map((record) =>
                record._id === updatedRecord._id ? updatedRecord : record
            )
        );
        setHighlightedRecord(updatedRecord._id);

        // Add glow effect for 2 seconds
        setIsGlowing(true);
        setTimeout(() => {
            setHighlightedRecord(null);
            setIsGlowing(false);
        }, 2000); // Keep highlight for 2 seconds
    };

    return (
        <div className="container mx-auto p-6 bg-gray-900 text-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-6">FitMi Health Metrics Dashboard</h1>
            <button
                className="bg-teal-500 text-white px-5 py-3 mb-6 rounded shadow-lg hover:bg-teal-400 transition duration-300"
                onClick={() => setIsModalOpen(true)}
            >
                Add New Record
            </button>
            <SearchBar onSearch={handleSearch} />
            <div className="mb-6 flex gap-4">
                {["date", "heartRate", "bodyTemperature", "bloodPressure", "bmi"].map(
                    (field) => (
                        <button
                            key={field}
                            className="bg-indigo-500 text-white px-4 py-2 rounded shadow-lg hover:bg-indigo-400 transition duration-300"
                            onClick={() => handleSort(field)}
                        >
                            Sort by {field.charAt(0).toUpperCase() + field.slice(1)}{" "}
                            {sortOrder === "asc" ? "↑" : "↓"}
                        </button>
                    )
                )}
            </div>
            <AddHealthRecord userId={userId}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                refreshRecords={() => {
                    console.log(userId);
                    fetchHealthRecords(userId).then((data) => {
                        setRecords(data);
                        setFilteredRecords(data);
                    });
                }}
            />
            {filteredRecords.length ? (
                <table className="table-auto w-full text-gray-100">
                    <thead>
                        <tr className="bg-gray-800">
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Body Temperature (Reference: 97.7-99.5°F)</th>
                            <th className="px-6 py-4">Blood Pressure (Reference: 120/80 mmHg)</th>
                            <th className="px-6 py-4">Heart Rate (Reference: 60-100 bpm)</th>
                            <th className="px-6 py-4">Body Mass Index (Reference: kg/m²)</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRecords.map((record) => (
                            <tr
                                key={record._id}
                                className={`${highlightedRecord === record._id || isGlowing ? "glow-active" : ""
                                    } transition-colors duration-300`}
                            >
                                <td className="border px-6 py-4">
                                    {new Date(record.date).toLocaleDateString()}
                                </td>
                                <td
                                    className={`border px-6 py-4 ${record.bodyTemperature > 99.5
                                        ? "bg-red-600 text-white"
                                        : record.bodyTemperature < 97.7
                                            ? "bg-yellow-400"
                                            : "bg-green-500 text-white"
                                        }`}
                                >
                                    {record.bodyTemperature}°F
                                </td>
                                <td
                                    className={`border px-6 py-4 ${record.bloodPressure.systolic > 140 ||
                                        record.bloodPressure.diastolic > 90
                                        ? "bg-red-600 text-white"
                                        : record.bloodPressure.systolic < 90 ||
                                            record.bloodPressure.diastolic < 60
                                            ? "bg-yellow-400"
                                            : "bg-green-500 text-white"
                                        }`}
                                >
                                    {record.bloodPressure.systolic}/
                                    {record.bloodPressure.diastolic}
                                </td>
                                <td
                                    className={`border px-6 py-4 ${record.heartRate > 100
                                        ? "bg-red-600 text-white"
                                        : record.heartRate < 60
                                            ? "bg-yellow-400"
                                            : "bg-green-500 text-white"
                                        }`}
                                >
                                    {record.heartRate} bpm
                                </td>
                                <td
                                    className={`border px-6 py-4 ${record.bmi >= 25
                                        ? "bg-red-600 text-white"
                                        : record.bmi >= 18.5 && record.bmi <= 24.9
                                            ? "bg-green-500 text-white"
                                            : "bg-orange-400"
                                        }`}
                                >
                                    {record.bmi}
                                </td>
                                <td className="border px-6 py-4">
                                    <table><tr> <td><input type="button" value="View"
                                        className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-400 transition duration-300"
                                        onClick={() => handleView(record)}
                                    /></td><td><input type="button" value="Delete"
                                            className="bg-red-600 text-white px-3 py-1 rounded ml-2 hover:bg-red-500 transition duration-300"
                                            onClick={() => handleDelete(record._id, record)}
                                    /></td></tr></table>




                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            ) : (
                <p>No records found.</p>
            )}
            {isModalOpen && selectedRecord && (
                <RecordModal
                    isOpen={isModalOpen}
                    record={selectedRecord}
                    onClose={() => setIsModalOpen(false)}
                    onUpdate={handleUpdateRecord}
                />
            )}
        </div>
    );
}

export default Dashboard;
