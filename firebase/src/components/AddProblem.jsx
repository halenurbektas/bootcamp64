import React, { useState } from "react";
import { addProblem } from "../firestore/problems";

const AddProblem = ({ onAdded }) => {
  const [content, setContent] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    if (!content.trim() || !answer.trim()) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }

    setLoading(true);
    try {
      await addProblem({ content, answer });
      setContent("");
      setAnswer("");
      if (onAdded) onAdded();
    } catch (err) {
      setError("Problem eklenirken hata oluştu: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleAdd} style={{ margin: "20px 0" }}>
      <h3>Yeni Problem Ekle</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <textarea
          placeholder="Problem metni"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          style={{ width: "100%", padding: "10px" }}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          placeholder="Cevap"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          style={{ width: "100%", padding: "10px" }}
        />
      </div>
      <button type="submit" disabled={loading} style={{ marginTop: "10px" }}>
        {loading ? "Ekleniyor..." : "Problem Ekle"}
      </button>
    </form>
  );
};

export default AddProblem;
