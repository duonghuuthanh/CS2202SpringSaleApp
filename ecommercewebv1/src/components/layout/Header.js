import { useEffect, useState } from "react";
import { Button, Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Apis, { endpoints } from "../../configs/Apis";

const Header = () => {
    const [categories, setCategories] = useState([]);
    const [kw, setKw] = useState();
    const nav = useNavigate();
   
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
        <>
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="#">OU's eCommerce</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    
                    <Link to="/" className="nav-link">Trang chủ</Link>
                    <NavDropdown title="Danh mục" id="navbarScrollingDropdown">
                        {categories.map(c => {
                            let url =  `/?categoryId=${c.id}`
                            return <Link className="dropdown-item" key={c.id} to={url}>{c.name}</Link>;
                        })}
                    </NavDropdown>
                    <Link to="/register" className="nav-link text-success">Đăng ký</Link>
                    <Link to="/login" className="nav-link text-danger">Đăng nhập</Link>
                </Nav>
                <Form onSubmit={search} className="d-flex">
                    <Form.Control value={kw} onChange={e => setKw(e.target.value)}
                        type="search"
                        placeholder="Tìm kiếm..."
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button type="submit" variant="outline-success">Tìm</Button>
                </Form>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </>
    );
}

export default Header;