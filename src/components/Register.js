import userEvent from '@testing-library/user-event';
import React from 'react'
import {Redirect, useHistory } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';

const ieltsOptions = [
  { value: 'no', label: 'no' },
  { value: 'yes', label: 'yes' },
  
];

const destinationOptions = [
  { value: 'australia', label: 'australia' },
  { value: 'usa', label: 'usa' },
  { value: 'canada', label: 'canada' },
  { value: 'japan', label: 'japan' },
  
];

const qualificationOptions = [
  { value: '+2', label: '+2' },
  { value: 'bachelors', label: 'bachelors' },
  { value: 'masters', label: 'masters' },]
  ;



class Register extends React.Component {
  constructor(props)
  {
    super(props)
  
    this.state = {
      ielts:  { value: 'no', label: 'no' },
      destination:  { value: 'australia', label: 'australia' },
      qualification:{ value: '+2', label: '+2' },
      showOption: false,
      name:"",
      address:"",
      phone:"",
      email:"",
      percentage:"",
      listening:"",
      reading:"",
      writing:"",
      speaking:"",
      overallband:"",
    };
 }


 handleDestinationChange = destination => {
   
  this.setState({ destination });
};

handleQualificationChange = qualification => {
   
  this.setState({ qualification });
};




 handleIeltsChange = ielts => {
   
  this.setState({ ielts });

  if(ielts.value === "y es")
  {
    this.setState({
      showOption:true
    })
  }else{
    this.setState({
      showOption:false
    })
  }
};

//required function

handleCancel = (e) => {
  
  this.props.history.push("/home");
  
}

handleDataEntry = async () => {
  // this.props.history.push("/home");
  // e.preventDefault();

  console.log(this.state.ielts.value)

  const ielts = this.state.ielts.value
  const destination =  this.state.destination.value
  const qualification = this.state.qualification.value

  const {name,address,phone,email,percentage,listening,reading,writing,speaking,overallband} = this.state

  

    const res = await fetch("/register",{
      method:"POST",
      headers:{
        'Content-Type' : 'application/json'
      },
      body:JSON.stringify({
        name:name,
        email:email,
        phone:phone,
        destination:destination,
        qualification :qualification,
        address:address,
        percentage:percentage,
        ielts:ielts,
        listening:listening,
        reading:reading,
        writing:writing,
        speaking:speaking,
        overallband:overallband
      })
    })

    const data = await res.json();
    if(data.status === 422 || !data)
    {
      window.alert("Failed");
      console.log("Registration failed");
    }else{
      window.alert("Successfull !!!");
      this.props.history.push("/home");
      console.log("Registration successfull");
    }

   
}

  render()
  {

    
    if(localStorage.getItem("token") === null)
    {
      return <Redirect to="/" />
    }

    const { ielts, destination , qualification } = this.state;
    return(
      <div>

       
        <input type = "text"  onChange={(e) => { this.setState({name: e.target.value})}}
          
          placeholder = "Enter your name" /> <br></br>

        <input type = "text"  onChange={(e) => { this.setState({address: e.target.value})}}
                 
                  placeholder = "Enter your address" /> <br></br>

         <input type = "text" onChange={this.handleChange} onChange={(e) => { this.setState({phone: e.target.value})}}
                  
                  placeholder = "Enter your Phone number" /> <br></br>
          
          <input type = "email" onChange={this.handleChange} onChange={(e) => { this.setState({email: e.target.value})}}
                 
                  placeholder = "Enter your emial" /> <br></br>

          <input type = "text" onChange={this.handleChange} onChange={(e) => { this.setState({percentage: e.target.value})}}
                 
                  placeholder = "Enter your Percentage" /> <br></br>

          <Select
            value={this.state.qualification}
            placeholder="+2"
            onChange={this.handleQualificationChange}
            options={qualificationOptions}
            isSearchable={false}
            
          />

          <Select
            value={this.state.destination}
            isSearchable={false}
            placeholder="australia"
            onChange={this.handleDestinationChange}
            options={destinationOptions}
            
          />

          <Select
            value={this.state.ielts}
            placeholder="no"
            onChange={this.handleIeltsChange}
            options={ieltsOptions}
            isSearchable={false}
            
          />

          {/* invisible div when option yes is clicked!! */}

          <div>
          {this.state.showOption &&
           <div>
             <p>Please enter your ielts score</p>
             <input type ="text" placeholder = "listening" onChange={(e) => { this.setState({listening: e.target.value})}} ></input>
             <input type ="text" placeholder = "reading" onChange={(e) => { this.setState({reading: e.target.value})}} ></input>
             <input type ="text" placeholder = "writing" onChange={(e) => { this.setState({writing: e.target.value})}} ></input>
             <input type ="text" placeholder = "speaking" onChange={(e) => { this.setState({speaking: e.target.value})}} ></input>
             <input type ="text" placeholder = "overall" onChange={(e) => { this.setState({overallband: e.target.value})}} ></input>

           </div>
            
          }
          </div>

          <button onClick = {this.handleDataEntry}>Save</button> <button onClick ={() => this.handleCancel()} >Cancel</button>
     

        
      </div>
    )
  }
}

export default Register;