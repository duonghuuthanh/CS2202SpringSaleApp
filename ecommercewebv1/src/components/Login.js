import { useContext, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import MySpinner from "./layout/MySpinner";
import Apis, { authApis, endpoints } from "../configs/Apis";
import cookie from 'react-cookies'
import { MyDispatchContext } from "../configs/MyContexts";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const info = [{
        label: "Tên đăng nhập",
        type: "text", 
        field: "username"
    }, {
        label: "Mật khẩu",
        type: "password", 
        field: "password"
    }];
    const dispatch = useContext(MyDispatchContext);
    const nav = useNavigate();

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    const login = async (e) => {
        e.preventDefault();

        let res = await Apis.post(endpoints['login'], {
            ...user
        });
        console.info(res.data);
        cookie.save('token', res.data.token);

         // let u = await authApis().get(endpoints['profile']);
        // console.info(u.data)

        dispatch({
            "type": "login",
            "payload": {
                "username": "dhthanh"
            }
        });
        nav("/");
    }

    const setState = (value, field) => {
        setUser({...user, [field]: value});
    }

    return (
        <>
            <h1 className="text-center text-success mt-1">ĐĂNG NHẬP NGƯỜI DÙNG</h1>
            <Form onSubmit={login}>
                {info.map(f => <FloatingLabel key={f.field} controlId="floatingInput" label={f.label} className="mb-3">
                    <Form.Control type={f.type} placeholder={f.label} required value={user[f.field]} onChange={e => setState(e.target.value, f.field)} />
                </FloatingLabel>)}
                {loading ? <MySpinner />:<Button type="submit" variant="success" className="mt-1 mb-1">Đăng nhập</Button>}
            </Form>
        </>
    )
}

export default Login;