import React, { useState } from 'react';

function PostFeedback() {
    const [feedback, setFeedback] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Add logic to post feedback request
        console.log('Feedback:', feedback);
    };

    return (
        <div>
            <h2>Post Feedback Request</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="feedback">Feedback:</label>
                <textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default PostFeedback;
