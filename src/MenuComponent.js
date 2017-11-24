import React, { Component } from 'react';

export default class Menu extends Component {


 handleChange(event) {
   this.setState({value: event.target.value});
 }

 render(){
   return(
     <div>
       <h2 className="subtitle has-text-info">{this.props.title}</h2>
       <div className="field">
         <div className="control">
           <div className="select is-fullwidth">
           <select value={this.props.selectedItem.measure_name} onChange={this.props.onChange}>
             {this.props.items().map((item, i) =>
               <option key={i} value={item.measure_name}>{item.measure_name}</option>
             )}
           </select>
           </div>
         </div>
       </div>
       <p>{this.props.description}</p>
     </div>
   );
 }
}
