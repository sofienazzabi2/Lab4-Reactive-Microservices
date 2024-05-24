import React, { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    document: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      document: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, document } = formData;
    const formDataToSend = new FormData();
    formDataToSend.append("name", name);
    formDataToSend.append("email", email);
    formDataToSend.append("document", document);

    try {
      await axios.post("/api/submitLoanApplication", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Loan application submitted successfully!");
    } catch (error) {
      console.error("Error submitting loan application:", error);
      alert("Error submitting loan application. Please try again.");
    }
  };

  return (
    <div className="App">
      <h1>Loan Application Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <br />
        <input type="file" name="document" onChange={handleFileChange} />
        <br />
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
}

export default App;
