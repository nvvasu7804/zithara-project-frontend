import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import "../styles/Admin.css";

const AdminPanel = () => {
  const [faqs, setFaqs] = useState([]);
  const [form, setForm] = useState({ question: "", answer: "" });
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchFaqs = async () => {
    const res = await axios.get("/admin/faqs", {
      headers: { Authorization: token },
    });
    setFaqs(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`/admin/faqs/${editId}`, form, {
        headers: { Authorization: token },
      });
    } else {
      await axios.post("/admin/faqs", form, {
        headers: { Authorization: token },
      });
    }
    setForm({ question: "", answer: "" });
    setEditId(null);
    fetchFaqs();
  };

  const handleEdit = (faq) => {
    setForm({ question: faq.question, answer: faq.answer });
    setEditId(faq._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/admin/faqs/${id}`, {
      headers: { Authorization: token },
    });
    fetchFaqs();
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  return (
    <div className="admin-container">
      <h2>Admin Panel - Manage FAQs</h2>
      <form onSubmit={handleSubmit} className="faq-form">
        <input
          type="text"
          placeholder="Question"
          value={form.question}
          onChange={(e) => setForm({ ...form, question: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Answer"
          value={form.answer}
          onChange={(e) => setForm({ ...form, answer: e.target.value })}
          required
        />
        <button type="submit">{editId ? "Update" : "Add"} FAQ</button>
      </form>

      <ul className="faq-list">
        {faqs.map((faq) => (
          <li key={faq._id}>
            <strong>Q:</strong> {faq.question}
            <br />
            <strong>A:</strong> {faq.answer}
            <br />
            <button onClick={() => handleEdit(faq)}>Edit</button>
            <button onClick={() => handleDelete(faq._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
