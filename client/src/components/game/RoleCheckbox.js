import React, {Component} from 'react';
import './style/RoleCheckbox.css'

class RoleCheckbox extends Component {
  constructor(props){
    super(props)
    this.state ={
      isChecked: true
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(){
    this.props.onChange(this.state.isChecked);
    this.setState({isChecked: !this.state.isChecked});
  }

  render() {
    return (
      <div className="toggle">
        <input type='checkbox' id="spymaster-box" onChange={this.handleChange} >
        </input>
        <label htmlFor='spymaster-box'>Spymaster role</label>
      </div>
    )
  }
}

export default RoleCheckbox;
