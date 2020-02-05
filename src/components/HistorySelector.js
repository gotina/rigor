import React from 'react';
import { Dropdown } from 'react-bootstrap';

const HistorySelector = React.memo(function HistorySelector(props) {
  const historyList = [];
  for (let i = 0; i < localStorage.length; i++){
    if (localStorage.key(i).includes('wapp-')) {
      historyList.push((localStorage.key(i)).substring('wapp_'.length))
    }
  }

  let options = historyList.map((data, index) =>
    <Dropdown.Item key={data} onClick={props.handleSelect}>{data} </Dropdown.Item>
  );

  return(
    <Dropdown className="text-right" alignRight>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Previous Searches 
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {options}
      </Dropdown.Menu>
    </Dropdown>
  );
});

export default HistorySelector;