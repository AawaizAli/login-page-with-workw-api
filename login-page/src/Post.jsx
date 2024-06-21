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

      {post.comments && post.comments.length > 0 && (
        <div className="comments">
          <h3>Comments</h3>
          {post.comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p><strong>{comment.creator.name}:</strong> {comment.comment}</p>
              <p><strong>Date:</strong> {new Date(comment.createDate).toLocaleDateString()}</p>
              <p><strong>Reactions:</strong> {comment.reactionCount}</p>
              {comment.attachments && comment.attachments.length > 0 && (
                <div className="attachments">
                  {comment.attachments.map((attachment) => (
                    <img
                      key={attachment.id}
                      src={attachment.path}
                      alt={attachment.attachmentName}
                      className="attachment"
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
