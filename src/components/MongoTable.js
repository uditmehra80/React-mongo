import React  from 'react';
import axios from 'axios';

export default class MongoTable extends React.Component
{
    constructor(props){
        super(props);
        this.state ={
            users: [],
            data: {
                name:'',
                city: ''
            },
           Name:'',
           City:''

        }
        //event bind
        
    }
   
    componentDidMount(){
        axios.get("http://localhost:3001/books")
        .then(res => {
            this.setState({
                users: res.data,
                msg: res.status,
               
            })
        })
        .catch((err) =>{
            console.log(err)
        })
    }
    componentDidUpdate(){
        axios.get("http://localhost:3001/booksall")
        .then(res => {
            this.setState({
                users: res.data,
                msg: res.status,
               
            })
        })
        .catch((err) =>{
            console.log(err)
        })
    }
    
    
    DeleteClick(_id,e) {
        axios.delete(`http://localhost:3001/books/${_id}`,{})
        .then(res => {
          console.log(res.data);
        })
        .catch((err) =>{
            console.log(err)
        })
        alert("Data deleted");
      //  window.location.reload () //for refresh
    }

    EditClick(_id,e){
        console.log(_id)
        axios.get(`http://localhost:3001/books/${_id}`)
        .then(res => {
            this.setState({
               Name:res.data.name,
               City:res.data.city
            })
        })
        .catch((err) =>{
            console.log(err)
        })
        

        document.getElementById("hideTr").hidden=false;
    }

    SaveClick(_id,e){
        const data = {
            name: this.state.Name,
            city: this.state.City
        }

        axios.patch(`http://localhost:3001/books/${_id}`,data)
        .then(res => {
          console.log(res.data);
        })
        .catch((err) =>{
            console.log(err)
        })
       // alert("Updated");
       document.getElementById("hideTr").hidden=true;
      // window.location.reload ()

    }

    

    render(){
        return(
    <>
           <table className="table table-hover">
          <thead> 
            <tr>
              <th><i className="fa fa-user hideinput"></i> Name</th>
              <th><i className="fa fa-home hideinput"></i> City</th>
              <th><i className="fa fa-star"></i>Operations</th>
            </tr>
            <tr hidden id="hideTr">
                <td><input value={this.state.Name} onChange={ (e) => this.setState({Name:e.target.value})}></input></td>
                <td><input value={this.state.City} onChange={ (e) => this.setState({City:e.target.value})}></input></td>

            </tr>
          </thead>
          <tbody>
             {
               this.state.users.map(user => 
                 <tr key={user._id}>
                   <td>{user.name}</td>
                   <td>{user.city}</td>
                   <td> 
                       <button onClick={(e) => this.EditClick(user._id,e)} className="btn btn-warning button-M">Edit</button>
                    
                       <button   onClick={(e) => this.SaveClick(user._id,e)} className="btn btn-success button-M">Save Edit</button>
                  
                       <button onClick={(e) => this.DeleteClick(user._id,e)} className="btn btn-danger button-M">Delete</button> 
                   </td>
                 </tr>
                )
             }
          </tbody>
        </table>
    </> 
        )
    }
}