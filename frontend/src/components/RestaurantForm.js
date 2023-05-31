import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function RestaurantForm({handleSubmit}) {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>名字</Form.Label>
        <Form.Control type="name" placeholder="輸入店家" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="address">
        <Form.Label>地址</Form.Label>
        <Form.Control type="address" placeholder="地址" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="rating">
        <Form.Label>評分</Form.Label>
        <Form.Control type="rating" placeholder="評分" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default RestaurantForm;