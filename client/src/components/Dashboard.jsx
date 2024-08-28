import {
  Button,
  Container,
  Modal,
  Form,
  Accordion,
  ListGroup,
  Col,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AddBlogItems,
  checkToken,
  GetItemsByUserId,
  GetLoggedInUser,
  LoggedInData,
} from "../Services/DataService";

const Dashboard = ({ isDarkMode }) => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogTags, setBlogTags] = useState("");
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);

  const [userId, setUserId] = useState(0);
  const [publisherName, setPublisherName] = useState("");

  const [blogItems, setBlogItems] = useState([]);

  const handleSaveWithPublished = async () => {
    let { publisherName, userId } = LoggedInData();
    const published = {
      Id: 0,
      userId: userId,
      PublisherName: publisherName,
      Tag: blogTags,
      Title: blogTitle,
      Image: blogImage,
      Description: blogDescription,
      Date: new Date(),
      Category: blogCategory,
      isPublished: true,
      isDeleted: false,
    };
    console.log("Saving with publish:", published); 
    handleClose();
    let result = await AddBlogItems(published);
    if(result)
    {
      let userBlogItems = await GetItemsByUserId(userId)
      setBlogItems(userBlogItems);
      console.log(userBlogItems, "this is from our UserBlogItems");
    }
    
  };
  
  const handleSaveWithUnPublished = () => {
    let { publisherName, userId } = LoggedInData();
    const notPublished = {
      Id: 0,
      userId: userId,
      PublisherName: publisherName,
      Tag: blogTags,
      Title: blogTitle,
      Image: blogImage,
      Description: blogDescription,
      Date: new Date(),
      Category: blogCategory,
      isPublished: false,
      isDeleted: false,
    };
    console.log("Saving with publish:", notPublished); 
  
  
  };
  

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setShow(true);
    if (e.target.textContent === "Add Blog Item") {
      setEdit(false);
      setBlogTitle("");
      setBlogDescription("");
      setBlogCategory("");
    } else {
      setEdit(true);
      setBlogTitle("awesome title");
      setBlogDescription("awesome description");
      setBlogCategory("Fitness");
    }
    console.log(e.target.textContent, edit);
  };

  const handleTitle = (e) => {
    setBlogTitle(e.target.value);
  };
  const handleDescription = (e) => {
    setBlogDescription(e.target.value);
  };
  const handleTag = (e) => {
    setBlogTags(e.target.value);
  };
  const handleCategory = (e) => {
    setBlogCategory(e.target.value);
  };
  // const handleImage = (e) => {
  //   setBlogImage(e.target.value);
  // };

  let navigate = useNavigate();
  useEffect(() => {
    if (!checkToken()) {
      navigate("/Login");
    }
  }, []);


  const handleImage = async (e) => {
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {  
      console.log(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Container
        data-bs-theme={isDarkMode ? "dark" : "light"}
        className={isDarkMode ? "bg-dark text-light p-5" : "bg-light ps-5"}
        fluid
      >
        <Button variant="outline-primary m-2" onClick={handleShow}>
          Add Blog Item
        </Button>
        <Button variant="outline-primary m-2" onClick={handleShow}>
          Edit Blog Item
        </Button>

        <Modal
          data-bs-theme={isDarkMode ? "dark" : "light"}
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>{edit ? "Edit" : "Add"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="Title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Title"
                  value={blogTitle}
                  onChange={handleTitle}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter Description"
                  value={blogDescription}
                  onChange={handleDescription}
                />
              </Form.Group>

              <Form.Group controlId="Category">
                <Form.Label>Category</Form.Label>
                <Form.Select value={blogCategory} onChange={handleCategory}>
                  <option>Select Category</option>
                  <option value="Food">Food</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Sports">Sports</option>
                  <option value="Tech">Tech</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="Tags">
                <Form.Label>Tags</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Tag"
                  value={blogTags}
                  onChange={handleTag}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="Image">
                <Form.Label>Pick an Image</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Select an Image from file"
                 accept="image/png, image/jpg" 
                  onChange={handleImage}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveWithUnPublished}>
              {edit ? "Save Changes" : "Save"}
            </Button>
            <Button variant="primary" onClick={handleSaveWithPublished}>
              {edit ? "Save Changes" : "Save"} and Publish
            </Button>
          </Modal.Footer>
        </Modal>

        <Accordion defaultActiveKey={["0", "1"]} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Accordion Item #1</Accordion.Header>
            <Accordion.Body>
              {blogItems.map(
                (item, i) =>
                  item.isPublished && (
                    <ListGroup key={i}>
                      {item.title}
                      <Col className="d-flex justify-content-end mx-2">
                        <Button variant="outline-danger mx-2">Delete</Button>
                        <Button variant="outline-info mx-2">Edit</Button>
                        <Button variant="outline-primary mx-2">Publish</Button>
                      </Col>
                    </ListGroup>
                  )
              )}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Accordion Item #2</Accordion.Header>
            <Accordion.Body>
              {blogItems.map(
                (item, i) =>
                  !item.isPublished && (
                    <ListGroup key={i}>
                      {item.title}
                      <Col className="d-flex justify-content-end mx-2">
                        <Button variant="outline-danger mx-2">Delete</Button>
                        <Button variant="outline-info mx-2">Edit</Button>
                        <Button variant="outline-primary mx-2">Publish</Button>
                      </Col>
                    </ListGroup>
                  )
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </>
  );
};

export default Dashboard;
