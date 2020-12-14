    import React from 'react';
    import {Route, Redirect } from 'react-router-dom';
   import auth from './auth';


    const AuthRoute = ({ isAuth, component: Component, ...rest }) => (

      
        <Route 
        {...rest} 
            render={(props) =>
            auth.authz === false ? <Redirect to='/login'/> : <Component {...props}/>
                
                }
    
            />
        );

    

    export default AuthRoute