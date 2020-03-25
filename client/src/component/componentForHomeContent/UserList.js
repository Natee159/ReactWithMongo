import React, { Component } from "react";
import { Col ,Button } from "antd";

class UserList extends Component {
  render() {
    console.log('userlist : ',this.props);
    const { xl,xr } = this.props;
    return (
      <div>
            <Button>
            <h4>
              xl : {xl} xr : {xr}
            </h4>
            </Button>
      </div>
    );
  }
}
export default UserList;
