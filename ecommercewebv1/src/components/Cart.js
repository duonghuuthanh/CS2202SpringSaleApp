import { useContext, useState } from "react";
import { Alert, Button, Col, Row, Table } from "react-bootstrap";
import cookie from 'react-cookies'
import { MyUserContext } from "../configs/MyContexts";
import { Link } from "react-router-dom";
import Apis, { endpoints } from "../configs/Apis";

const Cart = () => {
    const [cart, setCart] = useState(cookie.load('cart') || null);
    const user = useContext(MyUserContext);

    const pay = async () => {
        const res = await Apis.post(endpoints['pay'], Object.values(cart));
        if (res.status === 200) {
            setCart([]);
            cookie.remove('cart');
        }
    }

    return (
        <>
            <h1 className="text-center text-info mt-1">Giỏ hàng</h1>

            {cart === null? <>
                <Alert variant="warning">KHÔNG có sản phẩm nào trong giỏ!</Alert>
            </>:<>
                <Table striped bordered hover>
                    <Row>
                        <Col>Id</Col>
                        <Col>Tên sản phẩm</Col>
                        <Col>Đơn gia</Col>
                        <Col></Col>
                    </Row>
                    {Object.values(cart).map(c => <Row key={c.id}>
                        <Col>{c.id}</Col>
                        <Col>{c.name}</Col>
                        <Col>{c.price}</Col>
                        <Col>{c.quantity}</Col>
                    </Row>)}
                    
                </Table>
            </>}

            <div className="mt-1 mb-1">
                {user === null?<>
                    <p>Vui lòng <Link to="/login?next=/cart">đăng nhập</Link> để thanh toán!</p>
                </>:<>
                    <Button className="btn btn-info" onClick={pay}>Thanh toán</Button>
                </>}
                    
            </div>
        </>
    );
}

export default Cart;