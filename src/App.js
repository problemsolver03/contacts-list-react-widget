import React from "react";
import Table from "./components/Table";
import FileUpload from "./components/FileUpload";

class App extends React.Component {
  state = {
    loading: false,
    fileDetails: null,
    errorMessage: null,
    delimeter: ",",
    rows: 2,
  };

  fileUpload = () => {
    const formData = new FormData();
    const fileField = document.querySelector('input[type="file"]');
    formData.append("files", fileField.files[0]);

    this.setState({ loading: true });
    fetch("https://contact-list-react-app.herokuapp.com/fileprocessing", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.length < 1) {
          this.setState({
            loading: false,
            errorMessage: "No data in the file uploaded",
          });
        } else {
          this.setState({ fileDetails: response, loading: false });
        }
      })
      .catch((err) =>
        this.setState({
          errorMessage:
            "There was an issue while processing your request please make sure there is data in the file",
          loading: false,
        })
      );
  };

  handleFilter = (e) => {
    let targetID = e.target.getAttribute("id");
    let value = e.target.value.replace(/\s/g, "");
    if (value !== "" && targetID === "delimeter") {
      let symbolsRegex = /[$-/:-?{-~!"^_`\[\]]/;
      if (symbolsRegex.test(value)) {
        this.setState({ delimeter: value });
      }
    } else if (value !== "" && targetID === "rows") {
      this.setState({ rows: value });
    } else {
      this.setState({ [targetID]: value });
    }
  };

  tableData = (data, delimeter, rows) => {
    let contactObject = [];
    if (delimeter !== "" && Number(rows) > 0) {
      for (let i = 0; i < data.length; i++) {
        let deliSplit = data[i].split(delimeter);

        if (deliSplit.length > 1) {
          contactObject.push({
            name: deliSplit[0],
            address: deliSplit[1],
            city: deliSplit[2],
            country: deliSplit[3],
            zipcode: deliSplit[4],
          });
        }
      }
    }
    return contactObject.filter((val, i) => i < rows);
  };

  render() {
    let contactDetails =
      this.state.fileDetails !== null
        ? this.tableData(
            this.state.fileDetails,
            this.state.delimeter,
            this.state.rows
          )
        : null;

    return (
      <div className="container customSizing">
        
       
        <div className="row">

        
          
          <div className="col-md-8 offset-md-2">
          {this.state.loading ? (
          <p className="alert alert-warning">Loading please wait...</p>
        ) : null}

        {this.state.errorMessage ? (
          <p className="alert alert-danger">{this.state.errorMessage}</p>
            ) : null}
            
            <h2 className="page-header">Contacts list</h2>

            <form>
              <FileUpload fileUpload={this.fileUpload}/>
            </form>
            {this.state.fileDetails !== null ? (
              <Table data={contactDetails} handleFilter={this.handleFilter} />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
