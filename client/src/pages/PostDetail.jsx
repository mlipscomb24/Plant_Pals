import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";
import {
  Container,
  Comment,
  Form,
  Button,
  Header,
  Divider,
  Message,
  Loader,
  Icon,
} from "semantic-ui-react";

const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      _id
      title
      content
      author {
        username
      }
      createdAt
      comments {
        _id
        content
        author {
          username
        }
        createdAt
      }
    }
  }
`;

const CREATE_COMMENT = gql`
  mutation CreateComment($input: CommentInput!) {
    createComment(input: $input) {
      _id
      content
    }
  }
`;

const PostDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [commentContent, setCommentContent] = useState("");
  const [error, setError] = useState("");

  const {
    loading,
    error: queryError,
    data,
  } = useQuery(GET_POST, {
    variables: { id },
    onError: (error) => {
      if (error.message.includes("not found")) {
        navigate("/plantcare");
      }
    },
  });

  const [createComment, { loading: commentLoading }] = useMutation(
    CREATE_COMMENT,
    {
      refetchQueries: [{ query: GET_POST, variables: { id } }],
      onError: (error) => {
        setError(error.message);
      },
    }
  );

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) {
      setError("Comment cannot be empty");
      return;
    }
    try {
      await createComment({
        variables: {
          input: {
            content: commentContent.trim(),
            postId: id,
          },
        },
      });
      setCommentContent("");
      setError("");
    } catch (err) {
      console.error("Error creating comment:", err);
    }
  };

  if (loading)
    return (
      <Container className="mt-4">
        <Loader active>Loading post...</Loader>
      </Container>
    );

  if (queryError)
    return (
      <Container className="mt-4">
        <Message negative>
          <Message.Header>Error loading post</Message.Header>
          <p>{queryError.message}</p>
        </Message>
      </Container>
    );

  const post = data.post;

  return (
    <Container className="mt-4">
      <Button icon labelPosition="left" onClick={() => navigate("/plantcare")}>
        <Icon name="arrow left" />
        Back to Forum
      </Button>

      <Header as="h1" className="mt-4">
        {post.title}
      </Header>
      <div className="text-gray-600">
        Posted by {post.author?.username || "Anonymous"} on{" "}
        {new Date(parseInt(post.createdAt)).toLocaleDateString()}
      </div>

      {post.tags?.length > 0 && (
        <div className="mt-4 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="mr-2 px-2 py-1 bg-gray-200 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 mb-8">{post.content}</div>

      <Divider />

      <Comment.Group>
        <Header as="h3">Comments ({post.comments?.length || 0})</Header>

        {post.comments?.length === 0 && (
          <Message info>
            <p>No comments yet. Be the first to comment!</p>
          </Message>
        )}

        {post.comments?.map((comment) => (
          <Comment key={comment._id}>
            <Comment.Content>
              <Comment.Author as="span">
                {comment.author?.username || "Anonymous"}
              </Comment.Author>
              <Comment.Metadata>
                <div>
                  {new Date(parseInt(comment.createdAt)).toLocaleDateString()}
                </div>
              </Comment.Metadata>
              <Comment.Text>{comment.content}</Comment.Text>
            </Comment.Content>
          </Comment>
        ))}

        {/* Temporarily allow everyone to comment */}
        <Form reply onSubmit={handleCommentSubmit} error={!!error}>
          <Message error content={error} />
          <Form.TextArea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="Add your comment..."
          />
          <Button
            content="Add Comment"
            labelPosition="left"
            icon="edit"
            primary
            loading={commentLoading}
            disabled={commentLoading}
          />
        </Form>
      </Comment.Group>
    </Container>
  );
};

export default PostDetail;
