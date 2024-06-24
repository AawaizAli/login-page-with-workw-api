import React from 'react';
import './Post.css';

const Post = ({ post }) => {
  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p><strong>Author:</strong> {post.creator.name}</p>
      <p><strong>Date:</strong> {new Date(post.createDate).toLocaleDateString()}</p>
      <p><strong>Reactions:</strong> {post.reactionCount}</p>
      <p><strong>Comments:</strong> {post.commentCount}</p>

      {post.attachments && post.attachments.length > 0 && (
        <div className="attachments">
          <h3>Attachments</h3>
          {post.attachments.map((attachment) => (
            <div key={attachment.id} className="attachment">
              {attachment.attachmentTypeId === 1 ? (
                <img
                  src={attachment.path}
                  alt={attachment.attachmentName}
                  className="attachment-image"
                />
              ) : (
                <a href={attachment.path} target="_blank" rel="noopener noreferrer">
                  {attachment.attachmentName}
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {post.comments && post.comments.length > 0 && (
        <div className="comments">
          <h3>Comments</h3>
          {post.comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p><strong>{comment.creator.name}:</strong> {comment.comment}</p>
              <p><strong>Date:</strong> {new Date(comment.createDate).toLocaleDateString()}</p>
              <p><strong>Reactions:</strong> {comment.reactionCount}</p>
              {comment.attachments && comment.attachments.length > 0 && (
                <div className="comment-attachments">
                  {comment.attachments.map((attachment) => (
                    <img
                      key={attachment.id}
                      src={attachment.path}
                      alt={attachment.attachmentName}
                      className="comment-attachment"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
