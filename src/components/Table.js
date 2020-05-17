import React from "react";
import Filter from "./Filter";

const Table = ({ data, handleFilter }) => {
  return (
    <div>
      <Filter handleFilter={handleFilter} />
      {data.length < 1 ? (
        <p className="alert alert-warning">No data found try again.</p>
      ) : (
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>City</th>
              <th>Country</th>
              <th>Zipcode</th>
            </tr>
          </thead>
          <tbody>
            {data.map((details, i) => {
              return (
                <tr key={i}>
                  <td>{details.name}</td>
                  <td>{details.address}</td>
                  <td>{details.city}</td>
                  <td>{details.country}</td>
                  <td>{details.zipcode}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
