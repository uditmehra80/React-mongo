import React from 'react';
import axios from 'axios';

export default class form extends React.Component
{
    constructor(props){
        super(props);
        this.state ={
            data : {
                name : '',
                city : ''
            }
        }
        //event bind
        this.NameChanged = this.NameChanged.bind(this);
        this.CityChanged = this.CityChanged.bind(this);
    }
     NameChanged = event => {
       this.setState({
         data : {
           name: event.target.value,
           city: this.state.data.city,
         }
       })
    }
    CityChanged = event => {
     this.setState({
       data : {
         name: this.state.data.name,
         city: event.target.value,
       }
     })
    }
    SubmitClick = event => {
       const data = {
         name: this.state.data.name,
         city: this.state.data.city
       }
       axios.post(`http://localhost:3001/books`, data)
       .then(res => {
         console.log('Record Inserted');
         console.log(res.data);
       })
       alert("Record Inserted");
    }

    render(){
        return(
    <>
        <h3 id="head">Add User details</h3>
        <form onSubmit={this.SubmitClick} className="">
          <div>
            <dl>
              <dt className="form-group">Name</dt>
              <dd><input autoFocus type="text" className="form-control" onChange={this.NameChanged} required /></dd>
              <dt>City</dt>
              <dd><input  type="text" className="form-control" onChange={this.CityChanged} required/></dd>
            </dl>
            <button   className="btn btn-block btn-primary">Add</button>
            <br/>
          </div>
        </form>
    </> 
        )
    }
}