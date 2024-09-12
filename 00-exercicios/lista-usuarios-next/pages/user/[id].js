// pages/user/[id].js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Card, ListGroup, Container, Row, Col } from "react-bootstrap";

export default function UserDetails() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios.get(`https://dummyjson.com/users/${id}`)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error("Erro ao buscar detalhes do usuário:", error);
        });
    }
  }, [id]);

  if (!user) return <p>Carregando...</p>;

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="my-4">
            <Card.Img variant="top" src={user.image} alt={`${user.firstName} ${user.lastName}`} />
            <Card.Body>
              <Card.Title>{user.firstName} {user.lastName}</Card.Title>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>Email: {user.email}</ListGroup.Item>
                <ListGroup.Item>Telefone: {user.phone}</ListGroup.Item>
                <ListGroup.Item>Gênero: {user.gender}</ListGroup.Item>
                <ListGroup.Item>Idade: {user.age}</ListGroup.Item>
                <ListGroup.Item>Data de Nascimento: {user.birthDate}</ListGroup.Item>
                <ListGroup.Item>Universidade: {user.university}</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
