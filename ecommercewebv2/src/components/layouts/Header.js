import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Apis, { endpoints } from "../../configs/Apis";
import { MyDispatchContext, MyUserContext } from "../../configs/Contexts";

const Header = () => {
    const [categories, setCategories] = useState([]);
    const [kw, setKw] = useState();
    const nav = useNavigate();
    const user = useContext(MyUserContext);
    const dispatch = useContext(MyDispatchContext);

    const loadCates = async () => {
        let res = await Apis.get(endpoints['categories']);
        setCategories(res.data);
    }

    useEffect(() => {
        loadCates();
    }, []);

    const search = (e) => {
        e.preventDefault();

        nav(`/?kw=${kw}`);
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">OU's eCommerce</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link to="/" className="nav-link">Trang chủ</Link>
                    
                    <NavDropdown title="Danh mục" id="basic-nav-dropdown">
                        {categories.map(c => <Link to={`/?cateId=${c.id}`} className="dropdown-item" key={c.id}>{c.name}</Link>)}
                    </NavDropdown>

                    {user===null?<>
                        <Link to="/register" className="nav-link text-success">Đăng ký</Link>
                        <Link to="/login" className="nav-link text-danger">Đăng nhập</Link>
                    </>:<>
                        <Link to="/" className="nav-link text-success">Chào {user.username}!</Link>
                        <Button variant="danger" onClick={() => dispatch({"type": "logout"})}>Đăng xuất</Button>
                    </>}
                    
                </Nav>
                <Form inline onSubmit={search}>
                    <Row>
                    <Col xs="auto">
                        <Form.Control type="text" placeholder="Tìm sản phẩm..." className=" mr-sm-2" value={kw} onChange={e => setKw(e.target.value)} />
                    </Col>
                    <Col xs="auto">
                        <Button type="submit">Tìm</Button>
                    </Col>
                    </Row>
                </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;