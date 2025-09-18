import {Component} from 'react'

import UserCard from "./component/UserCard";

import "./App.css";

class App extends Component{
    render (){
      return (
        <div className = "bg-app-container">
           <UserCard />
        </div>
      )
    }
}

export default App;