import { Col, Container, Row } from 'react-bootstrap';
import { Navigation } from '.';

export const SiteWrapper = ({ children }) => <>
  <Navigation />

  <main role="main" className="flex-shrink-0 min-vh-100 bg-body-tertiary" style={{ paddingBottom: `2rem`, paddingTop: `5rem` }}>
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col lg={10} xl={9}>
          {children}
        </Col>
      </Row>
    </Container>
  </main>
</>;
