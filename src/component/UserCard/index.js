import { Component } from "react"; 

import DisplayDetails from "../DisplayDetails";

import "./index.css";

class UserCard extends Component {
  state = { profileDetails: []}; 

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
    const { profileDetails } = this.state;

    return (
      <div className="bg-container">
        <h1 className="heading-ele">Display Profile Details</h1>

       {profileDetails.map((eachItem) => (
            <DisplayDetails key={eachItem.id} eachProfileItem={eachItem} />
          ))}
      </div>
    );
  }
}

export default UserCard;
