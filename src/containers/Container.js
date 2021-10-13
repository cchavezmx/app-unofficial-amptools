import React, { Suspense } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import routes from '../routes'

const Container  = () => {
    return( 
    <Suspense fallback={<span>cargado...</span>}>
        <Switch>
            {
            routes
                .map((route, index) => {
                    return route.componente && (
                            <Route 
                            key={index}
                                path={route.path}
                                exact={route.exact}
                                name={route.name}
                                render={(props) => (
                                <route.componente { ...props }/>
                                    )}
                                />
                        )
                    })
                }
            <Redirect from="/" to="/dashboard" />
        </Switch>
    </Suspense>
    )
}

export default React.memo(Container)