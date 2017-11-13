import React from 'react';

export default function Menu(props){
  return(
    <div>
      <h2 className="subtitle has-text-info">{props.title}</h2>
      <div className="field">
        <div className="control">
          <div className="select is-fullwidth">
          <select>
            {props.items().map(item =>
              <option key={item.key}>{item.text}</option>
            )}
          </select>
          </div>
        </div>
      </div>
      <p>The average age of the population in a census tract</p>
    </div>
  );
}
