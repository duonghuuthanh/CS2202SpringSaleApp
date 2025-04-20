import { useContext, useState } from "react";
import { Alert, Button, Table } from "react-bootstrap";
import cookie from 'react-cookies';
import { MyCartContext, MyDispatchContext, MyUserContext } from "../configs/Contexts";
import { Link } from "react-router-dom";
import { authApis, endpoints } from "../configs/Apis";

const Cart = () => {
    const [cart, setCart] = useState(cookie.load('cart') || null);
    const user = useContext(MyUserContext);
    const [ ,cartDispatch] = useContext(MyCartContext);
    
    const pay = async () => {
        if (window.confirm("Bạn chắc chắn thanh toán?") === true) {
            let res = await authApis().post(endpoints['cart-payment'], Object.values(cart));
            if (res.status === 200) {
                cartDispatch({"type": "paid"})
                setCart({});
            }
        }
    }

    const removeItem = (id) => {
        if (id in cart) {
            delete cart[id];
            cookie.save('cart', cart);
            cartDispatch({"type": "update"});

            setCart(cart);
        }
    }

    return (
        <>
            <h1 className="text-center text-info mt-1">GIỎ HÀNG</h1>

            {cart === null ? <Alert variant="info" className="mt-2">KHÔNG có sản phẩm nào trong giỏ!</Alert>:<>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Tên sản phẩm</th>
                            <th>Đơn giá</th>
                            <th>Số lượng</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {Object.values(cart).map(c => <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.name}</td>
                            <td>{c.price.toLocaleString()} VNĐ</td>
                            <td>{c.quantity}</td>
                            <td>
                                <Button variant="danger" onClick={() => removeItem(c.id)}>&times;</Button>
                            </td>
                        </tr>)}
                        
                  
                       
                    </tbody>
                </Table>
                
                {user === null?<Alert className="mt-2 mb-2" variant="warning">
                    Vui lòng <Link to='/login?next=/cart'>đăng nhập</Link> để thanh toán!
                </Alert>:<Button onClick={pay} variant="success" className="mt-2 mb-2">Thanh toán</Button>}
                
            </>}
        </>
    );
}

export default Cart;