import React, { useContext, useState } from 'react';
import { PostContext } from './PostContext';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';


const Main = () => {
  const { posts, setPosts, loading } = useContext(PostContext);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handleRemove = (indexToRemove) => {
    const globalIndex = indexOfFirstPost + indexToRemove;
    const updatedPosts = [...posts];
    updatedPosts.splice(globalIndex, 1);
    setPosts(updatedPosts);

    
    if (indexOfLastPost < posts.length) {
      
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <h3 className='text-center mt-5'>Loading...</h3>;

  return (
    <div className='container mt-4'>
      <Row>
        {currentPosts.map((post, index) => (
          <Col md={4} className='mb-4' key={post.id}>
            <Card>
              <Card.Body>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Card.Title>{post.title}</Card.Title>
                  <FaTimes
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => handleRemove(index)}
                  />
                </div>
                <Card.Text>{post.body}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

     
      <div className='d-flex justify-content-center mt-3'>
        <Button
          variant='secondary'
          className='me-2'
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </Button>
        {[...Array(totalPages).keys()].map((num) => (
          <Button
            key={num}
            variant={currentPage === num + 1 ? 'primary' : 'outline-primary'}
            onClick={() => handlePageChange(num + 1)}
            className='mx-1'
          >
            {num + 1}
          </Button>
        ))}
        <Button
          variant='secondary'
          className='ms-2'
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Main;
