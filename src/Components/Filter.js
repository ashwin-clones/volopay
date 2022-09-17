import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

export default function Filter({ data, setData }) {
  const [openBody, setOpenBody] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState([])
  const handleSubmit = () => {
    const filteredData = data.filter(itr => checkedKeys.includes(itr.card_type))
    setData(filteredData.length ? filteredData : data)
    setOpenBody(false)
  }

  const handleCheckbox = ({target}) => {
    if(target.checked){
        setCheckedKeys([...checkedKeys,target.name])
    }else{
        setCheckedKeys(checkedKeys.filter(itr => itr !== target.name))
    }
  }

  return (
    <div className="custom-filter">
      <div className="filter-ic">
        <div onClick={()=> setOpenBody(true)} className='cur-p' >
        <FontAwesomeIcon icon={faFilter} /> Filter
        </div>
        {openBody && (
          <div className="filter-body">
            <div className="title">Filters</div>

            <div className="body">
              <div>
                <div className="c-gray-1 mb-12 fw-500">Type</div>
                <div className="checbox-wrapper">
                  <div className="d-flex-c-c checkbox">
                    <input onChange={handleCheckbox} name="subscription" type="checkbox" checked={checkedKeys.includes('subscription')} />
                    <label>subscription</label>
                  </div>
                  <div className="d-flex-c-c checkbox">
                    <input onChange={handleCheckbox} type="checkbox" name="burner" checked={checkedKeys.includes('burner')} />
                    <label>burner</label>
                  </div>
                </div>
              </div>
              <div className="cta-wrapper">
                <button className="primary cur-p" onClick={handleSubmit} >Apply</button>
                <button className="seconday cur-p" onClick={()=>setOpenBody(false)} >Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
