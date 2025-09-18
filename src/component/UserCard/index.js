import { Component } from "react";
import DisplayDetails from "../DisplayDetails";
import "./index.css";

class UserCard extends Component {
  state = { profileDetails: [] };

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
      console.log("getting error in code", error);
    }
  };

  // Delete user by id
  getDeletionId = (id) => {
    this.setState((prevState) => ({
      profileDetails: prevState.profileDetails.filter(
        (profile) => profile.id !== id
      ),
    }));
  };

  // Update user by id
  updateProfileDetails = (updatedUser) => {
    console.log("Updating user in parent:", updatedUser);
    this.setState((prevState) => ({
      profileDetails: prevState.profileDetails.map((profile) =>
        profile.id === updatedUser.id ? { ...profile, ...updatedUser } : profile
      ),
    }));
  };

  render() {
    const { profileDetails } = this.state;

    return (
      <div className="bg-container-1">
        <h1 className="heading-ele">Display Profile Details</h1>
        <div className="bg-container" style={{ display: "flex", flexWrap: "wrap" }}>
          {profileDetails.map((eachItem) => (
            <DisplayDetails
              key={eachItem.id}
              eachProfileItem={eachItem}
              getDeletionId={this.getDeletionId}
              updateProfileDetails={this.updateProfileDetails}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default UserCard;
