// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import Landing from './pages/Landing';
// import reportWebVitals from './reportWebVitals';
// import { BrowserRouter } from "react-router-dom";
// import { Route, Switch } from "react-router";
// import Dashboard from "./pages/Dashboard";
// import Admin from './pages/Admin';
// import Profile from './pages/Profile';
// import { User } from './interfaces/todosInterface';
// import ProtectedRoute from './components/auth/ProtectedRoute';

// const user: User = JSON.parse(localStorage.getItem('user')!);

// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       {/* <Route path="/" component={Landing} exact />
//       <Route path="/admin" component={Admin} exact /> 
//       <Route path="/profile" component={Profile} exact />
//       <Route path="/dashboard" component={RequireAuth(Dashboard)} />  */}

//       <Switch>
//         <Route path="/" component={Landing} exact />
//         <ProtectedRoute 
//           isAuthenticated={user ? true : false} 
//           isAllowed={(user && user.isAdmin) ? true : false} 
//           restrictedPath="/dashboard" authenticationPath='/' 
//           path='/admin' component={Admin}
//           />
//         <ProtectedRoute 
//           isAuthenticated={user ? true : false} 
//           isAllowed={(user && !user.isAdmin) ? true : false} 
//           restrictedPath="/admin" authenticationPath='/' 
//           path='/profile' component={Profile}
//           />
//         <ProtectedRoute 
//           isAuthenticated={user ? true : false} 
//           isAllowed={(user && !user.isAdmin) ? true : false} 
//           restrictedPath="/admin" authenticationPath='/'
//           path='/dashboard' component={Dashboard} 
//           />
//       </Switch>

//       {/* <Route path="/admin" component={() => ((user && user.isAdmin) ? <Admin /> : <Redirect to="/dashboard" />)} exact /> 
//       <Route path="/profile" component={() => ((user && !user.isAdmin) ? <Profile /> : <Redirect to="/admin" />)} exact />
//       <Route path="/dashboard" component={RequireAuth(Dashboard)} />
//       <Route path="/" exact component={() => (!user ? <Landing /> : <Redirect to="/dashboard" />)} />  */}
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
