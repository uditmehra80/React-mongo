import React from 'react';
import axios from 'axios';

export default class MongoTable extends React.Component
{
    constructor(props){
        super(props);
        this.state ={
            users: [],
            msg : '',
            data : {
                name : '',
                city : ''
            }
        }
        //event bind
    }
    componentDidMount(){
        axios.get("http://localhost:3001/books")
        .then(res => {
            this.setState({
                users: res.data,
                msg: res.status
            })
        })
    }

    render(){
        return(
    <>
           <table className="table table-hover">
          <thead>
            <tr>
              <th><i className="fa fa-user"></i> Name</th>
              <th><i className="fa fa-home"></i> City</th>
            </tr>
          </thead>
          <tbody>
             {
               this.state.users.map(user => 
                 <tr key={user._id}>
                   <td>{user.name}</td>
                   <td>{user.city}</td>
                 </tr>
                )
             }
          </tbody>
        </table>
    </> 
        )
    }
}