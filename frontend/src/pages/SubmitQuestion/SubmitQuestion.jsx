import React, { useState, useRef } from 'react';
import './SubmitQuestion.css';

const SubmitQuestion = () => {
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('');
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const newPreviews = newFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newPreviews]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('question', question);
      images.forEach((img) => formData.append('images', img.file));

      const response = await fetch('http://localhost:5000/api/send-question', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        setStatus('✅ Your question has been submitted successfully!');
        setEmail('');
        setQuestion('');
        setImages([]);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        setStatus(`❌ Error: ${data.message}`);
      }
    } catch {
      setStatus('❌ Something went wrong. Please try again later.');
    }
  };

  const removeImage = (i) => {
    setImages((prev) => {
      const copy = [...prev];
      URL.revokeObjectURL(copy[i].preview);
      copy.splice(i, 1);
      return copy;
    });
  };

  // build a newline-separated list of filenames
  const filenames = images.map((img) => img.file.name).join('\n');

  return (
    <div className="submit-question-container">
      <h1>Submit a Question</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          placeholder="example@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="question">Your Question</label>
        <textarea
          id="question"
          placeholder="Describe your question or issue here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />

        <label htmlFor="images" className="file-upload-btn">
          📷 Choose images to upload (optional)
        </label>
        <input
          type="file"
          id="images"
          accept="image/*"
          multiple
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        {filenames && (
          <textarea
            className="file-list-display"
            readOnly
            value={filenames}
            rows={Math.min(4, images.length)}
          />
        )}

        {images.length > 0 && (
          <div className="image-preview-grid">
            {images.map((img, idx) => (
              <div key={idx} className="image-thumb">
                <img src={img.preview} alt={`upload-${idx}`} />
                <button type="button" onClick={() => removeImage(idx)}>
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <button type="submit">Submit</button>
      </form>
      {status && <p className="status-message">{status}</p>}
    </div>
  );
};

export default SubmitQuestion;