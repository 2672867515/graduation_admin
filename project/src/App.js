import logo from './logo.svg';
import './App.css';
import React,{Suspense, useEffect, useState} from "react";
import { Route,Link,Switch,Redirect,useHistory  } from 'react-router-dom';
import routes from './router.ts'
function App() {
  return (
    <div className="App">
      {/* 注册路由 */}
      <Suspense>
        <Switch>
          {routes.map((item,index)=>{
           return <Route path={item.path} key={index} component={item.component} />
          })}
          <Redirect to="/Login" />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
