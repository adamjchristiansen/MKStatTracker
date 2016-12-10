import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

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
    // this.state = {
    //   name: this.props.playerName, //'',
    //   place: this.props.playerPlace, //1,
    // };

    this.handleChange_name = this.handleChange_name.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange_place = this.handleChange_place.bind(this);
  }

  handleChange_name(event) {
    const name = event ? event.value : '';
    // this.setState({name: name});
    this.props.onPlayerChange(this.props.courseId, this.props.playerId, {name: name, place: this.props.playerPlace});
  }

  handleChange_place(event) {
    // this.setState({place: event.target.value});
    // this.props.onPlaceChange(this.props.courseId, this.props.playerId, {name: this.state.name, place: event.target.value});
    this.props.onPlayerChange(this.props.courseId, this.props.playerId, {name: this.props.playerName,
      place: parseInt(event.target.value)});
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
            // value={this.state.name}
            value={this.props.playerName}
            options={PlayerNameOptions}
            onChange={this.handleChange_name}
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
    const course = event ? event.value : '';
    this.props.onChange(this.props.formId, {course: course});
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
            // value={this.state.course}
            value={this.props.course}
            options={this.courses}
            onChange={this.handleChange}
          />
         </div>
    );
  }
}


function Player(name, places) {
  this.name = name;
  this.places = places;
}

class MKForm extends React.Component {
  constructor() {
    super();
    this.state = {
      numPlayers: "4",
      players: [], //Array(4).fill(new Player('', Array(4).fill(null))), //array of objs with name and array of places
      courses: [],
    };

    for(var i = 0; i < parseInt(this.state.numPlayers); i++) {
      this.state.players.push(new Player('', Array(parseInt(this.state.numPlayers)).fill(1)));
    }

    this.handleSubmit = this.handleSubmit.bind(this);

    this.onCourseChange = this.onCourseChange.bind(this);
    this.onNumPlayersChange = this.onNumPlayersChange.bind(this);
    this.onPlayerChange = this.onPlayerChange.bind(this);
  }
  
  onCourseChange(i, event) {
    const courses = this.state.courses;
    courses[i] = event.course;
    this.setState({courses: courses});

    console.log(this.state);
  }

  onNumPlayersChange(event) {
    this.setState({numPlayers: event.target.value});

    console.log(this.state);
  }

  onPlayerChange(courseId, playerId, event) {
    //update player name
    const players = this.state.players;
    players[playerId].name = event.name;

    //update player's place
    const places = players[playerId].places;
    places[courseId] = event.place;
    players[playerId].places = places;
    
    this.setState({players: players});

    console.log(this.state);
  }
  
  handleSubmit(event) {
    alert('You submitted: ' + this.state);
    event.preventDefault();
  }
  
  render() {
    return (      
      <div className="form">
        <form autoComplete="on" onSubmit={this.handleSubmit}>
          <div className="num-players">

            <h4>Number of Players:</h4>               
            <select value={this.state.numPlayers} onChange={this.onNumPlayersChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          
          <hr></hr>

          <CourseBlock i={0} form={this}/>
          <hr></hr>
          <CourseBlock i={1} form={this}/>
          <hr></hr>
          <CourseBlock i={2} form={this}/>
          <hr></hr>
          <CourseBlock i={3} form={this}/>

          <br></br>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

function CourseBlock(props) {
  return (
    <div className="course">
      <h3>Course {props.i+1}</h3>
      <CourseForm onChange={props.form.onCourseChange} formId={props.i} course={props.form.state.courses[props.i]} />
      <br></br>
      <PlayerBlock courseId={props.i} form={props.form}/>
    </div>
  );
}

function PlayerBlock(props) {
  const playerForms = Array(parseInt(props.form.state.numPlayers));
  for(var i = 0; i < playerForms.length; i++) {
    
    const playerName = props.form.state.players[i].name;
    const playerPlace = props.form.state.players[i].places[props.courseId] === undefined 
      ? 1 
      : props.form.state.players[i].places[props.courseId];

    // console.log("playerName: " + playerName);
    // console.log("playerPlace: " + playerPlace);

    playerForms[i] = <PlayerForm onPlayerChange={props.form.onPlayerChange} courseId={props.courseId}
      playerId={i} playerName={playerName} playerPlace={playerPlace} />;
  }

  return (
    <div>
      {playerForms}
    </div>
  );
}

// ReactDOM.render(
//   <MKForm />,
//   document.getElementById('container')
// );

export default MKForm;