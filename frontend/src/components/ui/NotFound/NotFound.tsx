// import { useHistory, useNavigate } from "react-routers-dom";
import { Result } from "antd";
import AccentButton from "../AccentButton/AccentButton";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
    // const history = useHistory();
    const navigate = useNavigate();


    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<AccentButton title={'Back Home'} click={() => navigate('/')}/>}
        />
    );
};