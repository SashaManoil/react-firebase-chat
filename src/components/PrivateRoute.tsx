import { FC } from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute: FC<any> = ({component: Component,...rest}) => {
    return (
        <Route 
            {...rest} 
            component={(props: any) => {
                const localUser = localStorage.getItem("user");
                const user = localUser ? JSON.parse(localUser) : null;
                
                if(user) {
                    return <Component {...props} />
                } else {
                    return <Redirect to={`/SignIn`} />
                }
            }}
        /> 
    )
}

export default PrivateRoute;
