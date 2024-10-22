import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import {
  Container,
  Header,
  Segment,
  Card,
  Button,
  Icon,
  Modal,
  Form,
  Message,
  Dimmer,
  Loader,
} from "semantic-ui-react";

const GET_POSTS = gql`
  query GetPosts {
    posts {
      _id
      title
      content
      author {
        username
      }
      createdAt
      likes
      tags
      comments {
        _id
      }
    }
  }
`;

const CREATE_POST = gql`
  mutation CreatePost($input: PostInput!) {
    createPost(input: $input) {
      _id
      title
      content
      author {
        username
      }
      createdAt
      likes
      tags
    }
  }
`;

const Plantcare = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });
  const [error, setError] = useState("");

  const {
    loading,
    error: queryError,
    data,
  } = useQuery(GET_POSTS, {
    fetchPolicy: "network-only",
    onCompleted: (data) => console.log("Posts loaded:", data),
    onError: (error) => console.error("Error loading posts:", error),
  });

  const [createPost, { loading: postLoading }] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Title and content are required");
      return;
    }
    try {
      await createPost({
        variables: {
          input: {
            title: formData.title.trim(),
            content: formData.content.trim(),
            tags: formData.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean),
          },
        },
      });
      setIsModalOpen(false);
      setFormData({ title: "", content: "", tags: "" });
      setError("");
    } catch (err) {
      console.error("Error creating post:", err);
      setError(err.message);
    }
  };

  return (
    <Container>
      <Segment>
        <Header as="h2">Plant Forum</Header>
        <p>
          Here you'll find helpful tips for taking care of your plants. Interact
          with other users on Plant Pals!
        </p>
      </Segment>

      <Segment>
        <div className="flex justify-between items-center mb-4">
          <Button primary onClick={() => setIsModalOpen(true)}>
            <Icon name="plus" /> Create New Post
          </Button>
        </div>

        {loading && (
          <Segment basic>
            <Dimmer active inverted>
              <Loader>Loading Posts...</Loader>
            </Dimmer>
          </Segment>
        )}

        {queryError && (
          <Message negative>
            <Message.Header>Error loading posts</Message.Header>
            <p>{queryError.message}</p>
          </Message>
        )}

        {data?.posts?.length === 0 && (
          <Message info>
            <Message.Header>No posts yet</Message.Header>
            <p>Be the first to create a post!</p>
          </Message>
        )}

        <Card.Group>
          {data?.posts?.map((post) => (
            <Card
              fluid
              key={post._id}
              as={Link}
              to={`/plantcare/post/${post._id}`}
              className="hover:shadow-lg transition-shadow"
            >
              <Card.Content>
                <Card.Header>{post.title}</Card.Header>
                <Card.Meta>
                  Posted by {post.author?.username || "Anonymous"} on{" "}
                  {new Date(parseInt(post.createdAt)).toLocaleDateString()}
                </Card.Meta>
                <Card.Description>
                  {post.content.length > 200
                    ? `${post.content.substring(0, 200)}...`
                    : post.content}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Icon name="comment" /> {post.comments?.length || 0} Comments
                <span style={{ marginLeft: "1em" }}>
                  <Icon name="heart" /> {post.likes || 0} Likes
                </span>
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="mr-2 px-2 py-1 bg-gray-200 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Card.Content>
            </Card>
          ))}
        </Card.Group>

        <Modal
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setError("");
            setFormData({ title: "", content: "", tags: "" });
          }}
          size="small"
        >
          <Modal.Header>Create New Post</Modal.Header>
          <Modal.Content>
            <Form onSubmit={handleSubmit} error={!!error} loading={postLoading}>
              <Message error content={error} />
              <Form.Input
                label="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                maxLength={100}
              />
              <Form.TextArea
                label="Content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                required
                style={{ minHeight: 100 }}
              />
              <Form.Input
                label="Tags (comma-separated)"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                placeholder="watering, sunlight, propagation"
              />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              negative
              onClick={() => setIsModalOpen(false)}
              disabled={postLoading}
            >
              Cancel
            </Button>
            <Button
              positive
              onClick={handleSubmit}
              loading={postLoading}
              disabled={postLoading}
            >
              Create Post
            </Button>
          </Modal.Actions>
        </Modal>
      </Segment>
    </Container>
  );
};

export default Plantcare;
