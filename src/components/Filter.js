import React from 'react'

const Filter = ({ handleFilter}) => {
    return (
        <div className="filters">
        <br/>
           <div className="row">
              <div className="col-md-6">
                <label>
                   Delimeter
                </label>
                <input type="text" className="form-control" id="delimeter" defaultValue="," onChange={handleFilter}/>
            </div>
            
            <div className="col-md-6">
                <label>
                   Rows
                </label>
                <input type="number" className="form-control" id="rows" defaultValue="2" onChange={handleFilter}/>
              </div>
        </div>
        <br/>
    </div>
    )
}

export default Filter