import { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Row, Spinner } from "react-bootstrap";
import Apis, { endpoints } from "../configs/Apis";
import { useSearchParams } from "react-router-dom";
import MySpinner from "./layouts/MySpinner";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [q] = useSearchParams();

    let loadProducts = async () => {
        try {
            setLoading(true);

            let url = `${endpoints['products']}?page=${page}`;

            let cateId = q.get("cateId");
            if (cateId) {
                url = `${url}&categoryId=${cateId}`;
            }

            let kw = q.get('kw');
            if (kw) {
                url = `${url}&kw=${kw}`;
            }

            let res = await Apis.get(url);
            if (res.data.length === 0)
                setPage(0);
            else {
                if (page === 1)
                    setProducts(res.data);
                else
                    setProducts([...products, ...res.data]);
            }
                
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (page != 1)
            setPage(1);
    }, [q]);

    useEffect(() => {
        if (page > 0) 
            loadProducts();
    }, [q, page]);

   

    const loadMore = () => {
        if (!loading && page > 0)
            setPage(page + 1);
    }

    return (
        <>
            {products.length === 0 ? <Alert variant="info" className="mt-1">KHÔNG có sản phẩm nào!</Alert>:<>
                <Row>
                    {products.map(p => <Col className="p-1" md={3} xs={6}>
                        <Card>
                            <Card.Img variant="top" src={p.image} />
                            <Card.Body>
                                <Card.Title>{p.name}</Card.Title>
                                <Card.Text>{p.price} VNĐ</Card.Text>
                                <Button variant="primary" className="me-1">Xem chi tiết</Button>
                                <Button variant="danger">Đặt hàng</Button>
                            </Card.Body>
                        </Card>
                    </Col>)}
                </Row>
            </>}

            {loading &&  <MySpinner />}

            {page > 0 && <div className="text-center mb-2 mt-1">
                <Button variant="success" onClick={loadMore}>Xem thêm...</Button>
            </div>}

        </>
    );
}

export default Home;