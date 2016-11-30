import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// export default App;

// var Select = require('react-select');


const PlayerNameOptions = [
    { value: 'adam', label: 'Adam' },
    { value: 'jeff', label: 'Jeff' },
    { value: 'kyle', label: 'Kyle' },
    { value: 'ethan', label: 'Ethan' },
    { value: 'lincoln', label: 'Lincoln' },
    { value: 'dave', label: 'Dave' },
    { value: 'rich', label: 'Rich' },
    { value: 'joseph', label: 'Joseph' },
];

const Courses = {
  Mushroom: ["Mario Kart Stadium", "Water Park", "Sweet Sweet Canyon", "Thwomp Ruins"],
  Flower: ["Mario Circuit", "Toad Harbor", "Twisted Mansion", "Shy Guy Falls"],
  Star: ["Sunshine Airport", "Dolphin Shoals", "Electrodrome", "Mount Wario"],
  Special: ["Cloudtop Cruise", "Bone Dry Dunes", "Bowser's Castle", "Rainbow Road"],
  Shell: ["Moo Moo Meadows", "GBA Mario Circuit", "Cheep Cheep Beach", "Toad's Turnpike"],
  Banana: ["Dry Dry Desert", "Donut Plains 3", "Royal Raceway", "DK Jungle"],
  Leaf: ["Wario Stadium", "Sherbet Land", "Music Park", "Yoshi Valley"],
  Lightning: ["Tick-Tock Clock", "Piranha Plant Slide", "Grumple Volcano", "N64 Rainbow Road"],
  Egg: ["Yoshi Circuit", "Excitebike Arena", "Dragon Driftway", "Mute City"],
  Triforce: ["Wario's Gold Mine", "SNES Rainbow Road", "Ice Ice Outpost", "Hyrule Circuit"],
  Crossing: ["Baby Park", "Cheese Land", "Wild Woods", "Animal Crossing"],
  Bell: ["Neo Bowser City", "Ruin Road", "Super Bell Subway", "Big Blue"],
};

const Places = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function GetPlaces() {  
  var p = Places.map((place) => <option key={place}>{place}</option>);
  return (
    p
  );
}

function GetCourseOptions() {
  let t = [];

  for(var cup in Courses) {
    if(Courses.hasOwnProperty(cup)) {
      Courses[cup].map((course) =>
        t.push({value: course.toLowerCase(), label: course})
      );
    }
  }

  t.sort(function(a, b) {
    if(a.value < b.value) {
      return -1;
    } else {
      return 1;
    }
  });
  return t;
}

function GetCourses() {
  let allCourses = [];
  let c;
  
  for(var cup in Courses) {
    if(Courses.hasOwnProperty(cup)) {
      c = Courses[cup].map((course) =>
        <option key={course}>{course}</option>
      );
      
      c.map((option) =>
        allCourses.push(option)
      );
    }
  }
  
  allCourses.sort(function(a, b) {
    if(a.key < b.key) {
      return -1;
    } else {
      return 1;
    }
  });
  
  return (
    allCourses
  );
}


class PlayerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      place: 1,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange_place = this.handleChange_place.bind(this);
  }

  handleChange(event) {
    if(event) {
      this.setState({name: event.value});
    } 
    else {
      this.setState({name: ''});
    }
  }

  handleChange_place(event) {
    this.setState({place: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    this.places = GetPlaces();

    return (
      <div>
        <div className="react-select">
          <h5>Player Name:</h5>
          <Select
            name="player-name"
            value={this.state.name}
            options={PlayerNameOptions}
            onChange={this.handleChange}
          />
        </div>
        <div className="place-div">
          <h5>Place:</h5>
          <select /*value={this.state.value}*/ onChange={this.handleChange_place}>
            {this.places}
          </select>
        </div>
       </div>
    );
  }
}


class CourseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: '',
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    if(event) {
      this.setState({course: event.value});
    }
    else {
      this.setState({course: ''});
    }
  }
  
  handleSubmit(event) {
    alert('You submitted: ' + this.state.value);
    event.preventDefault();
  }
  
  render() {
    // this.courses = GetCourses();
    this.courses = GetCourseOptions();

    return (
        <div className="react-select">
          <h5>Pick the course:</h5>
          <Select
            name="course-name"
            value={this.state.course}
            options={this.courses}
            onChange={this.handleChange}
          />
         </div>
    );
  }
}

class MKForm extends React.Component {
  constructor() {
    super();
    this.state = {
      numPlayers: "4",
      players: [],
      courses: [],
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    this.setState({numPlayers: event.target.value});
  }
  
  handleSubmit(event) {
    alert('You submitted: ' + this.state.value);
    event.preventDefault();
  }
  
  render() {
    var playerForms = Array(parseInt(this.state.numPlayers)).fill(<PlayerForm />);
    
    return (      
      <div className="form">
        <form autoComplete="on" onSubmit={this.handleSubmit}>
          <div className="num-players">

            <h4>Number of Players:</h4>               
            <select value={this.state.numPlayers} onChange={this.handleChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          
          <hr></hr>

          <div className="course">
            <h3>Course 1</h3>
            <CourseForm />
            <br></br>
            {playerForms}
          </div>
          
          <hr></hr>
          
          <div className="course">
            <h3>Course 2</h3>
            <CourseForm />
            <br></br>
            {playerForms}
          </div>

          <hr></hr>

          <div className="course">
            <h3>Course 3</h3>
            <CourseForm />
            <br></br>
            {playerForms}
          </div>

          <hr></hr>

          <div className="course">
            <h3>Course 4</h3>
            <CourseForm />
            <br></br>
            {playerForms}
          </div>

          <br></br>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

// ReactDOM.render(
//   <MKForm />,
//   document.getElementById('container')
// );

export default MKForm;