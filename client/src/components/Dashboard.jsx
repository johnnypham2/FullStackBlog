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
  checkToken,
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

  const [blogItems, setBlogItems] = useState([
    {
      Id: 1,
      Title: "Top Finishing and Crossing Drills",
      Publisher: "anonymous",
      Date: "01-13-2022",
      Text: "Developing finishing and crossing skills is an important aspect of soccer that can greatly contribute to your player.",
      Image: "./assets/Images/3soccerballs.jpg",
      Published: true,
    },
    {
      Id: 2,
      Title: "6 Soccer Drills to Work on Defense",
      Publisher: "anonymous",
      Date: "01-14-2022",
      Text: "A strong defense is the backbone of any successful soccer team",
      Image: "./assets/Images/3soccerballs.jpg",
      Published: true,
    },
    {
      Id: 3,
      Title: "5 Small Side Games",
      Publisher: "anonymous",
      Date: "01-15-2022",
      Text: "Small-sided games create a fast-paced and intense environment.",
      Image: "./assets/Images/3soccerballs.jpg",
      Published: true,
    },
    {
      Id: 4,
      Title: "5 Fun 1 V 1 Youth Soccer Activities",
      Publisher: "anonymous",
      Date: "01-15-2022",
      Text: "One of the best ways to naturally bring out the competitive nature.",
      Image: "./assets/Images/3soccerballs.jpg",
      Published: false,
    },
    {
      Id: 5,
      Title: "5 Fun warm-up soccer drills",
      Publisher: "anonymous",
      Date: "01-15-2022",
      Text: "One of the challenges for youth soccer coaches is to make sure their players are always excited to come to practice.",
      Image: "./assets/Images/3soccerballs.jpg",
      Published: false,
    },
  ]);

  const handleSaveWithPublished = () => {
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
            <Button variant="primary" onClick={handleSaveWithPublished}>
              {edit ? "Save Changes" : "Save"}
            </Button>
            <Button variant="primary" onClick={handleSaveWithUnPublished}>
              {edit ? "Save Changes" : "Save"} and Publish
            </Button>
          </Modal.Footer>
        </Modal>

        <Accordion defaultActiveKey={["0", "1"]} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Accordion Item #1</Accordion.Header>
            <Accordion.Body>
              {blogItems.map(
                (item) =>
                  item.Published && (
                    <ListGroup key={item.Id}>
                      {item.Title}
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
                (item) =>
                  !item.Published && (
                    <ListGroup key={item.Id}>
                      {item.Title}
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
