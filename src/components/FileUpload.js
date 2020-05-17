import React from 'react'

const FileUpload = ({fileUpload}) => {
    return (
        <div>
        <br />
        <label>Upload a .txt file to continue.</label>
        <input
          type="file"
          className="form-control"
          id="file"
          onChange={fileUpload}
        />
      </div>
    )
}

export default FileUpload;