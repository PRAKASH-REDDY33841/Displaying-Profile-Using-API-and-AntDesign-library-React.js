<<<<<<< HEAD
import { Component } from "react"; 
=======
import { Component } from "react";

>>>>>>> 1a3583dcea6b524a208ca481c6bfa4b504211891

import DisplayDetails from "../DisplayDetails";

import "./index.css";

class UserCard extends Component {
<<<<<<< HEAD
  state = { profileDetails: []}; 
=======
  state = { profileDetails: []}; // ✅ added isLoading state
>>>>>>> 1a3583dcea6b524a208ca481c6bfa4b504211891

  componentDidMount() {
    this.getProfileData();
  }

  getProfileData = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
      if (response.ok === true) {
        const data = await response.json();
        this.setState({ profileDetails: data }); 
      }
    } catch (error) {
      console.log("getting error in code");
      
    }
  };

  render() {
<<<<<<< HEAD
    const { profileDetails } = this.state;
=======
    const { profileDetails} = this.state;
>>>>>>> 1a3583dcea6b524a208ca481c6bfa4b504211891

    return (
      <div className="bg-container">
        <h1 className="heading-ele">Display Profile Details</h1>

<<<<<<< HEAD
       {profileDetails.map((eachItem) => (
            <DisplayDetails key={eachItem.id} eachProfileItem={eachItem} />
          ))}
=======
        
    {profileDetails.map((eachItem) => (
  <DisplayDetails 
    key={eachItem.id} 
    eachProfileItem={eachItem} 
  />
))}
>>>>>>> 1a3583dcea6b524a208ca481c6bfa4b504211891
      </div>
    );
  }
}

export default UserCard;
