import { Button, Container, Modal, Form } from "react-bootstrap";
import { useState } from "react";

const Dashboard = ({ isDarkMode }) => {
    const [blogTitle, setBlogTitle] = useState("");
    const [blogImage, setBlogImage] = useState("");
    const [blogDescription, setBlogDescription] = useState("");
    const [blogCategory, setBlogCategory] = useState("");
    const [blogTags, setBlogTags] = useState("");

    const [edit, setEdit] = useState(false);


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (e) => {setShow(true);
        if(e.target.textContext === "Add Blog Item"){
            setEdit(false);
        }else{
            setEdit(true);
        }
   console.log(e.target.textContext, edit)
    }
  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center p-5"
        fluid
      >
        <Button variant="outline-primary" onClick={handleShow}>
          Add Blog Item
        </Button>

        <Modal
          data-bs-theme={isDarkMode ? "dark" : "light"}
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Blog Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="Title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter Title" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control as={'textarea'} placeholder="Enter Description" />
              </Form.Group>

              <Form.Group>
                <Form.Select controlId="Category">
                    <option>Select Category</option>
                    <option value="Food">Food</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Sports">Sports</option>
                    <option value="Tech">Tech</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="Tags">
                <Form.Label>Tags</Form.Label>
                <Form.Control type="text" placeholder="Enter Tag" />
              </Form.Group>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save and Publish
            </Button>
          </Modal.Footer>
        </Modal>

        <Button variant="outline-primary" onClick={handleShow}>Edit Blog Item</Button>
      </Container>
    </>
  );
};

export default Dashboard;
