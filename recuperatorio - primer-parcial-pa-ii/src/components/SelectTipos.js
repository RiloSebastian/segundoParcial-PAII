import React, { Component } from "react";

class SelectTipos extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="p-3 col-9 mx-auto">
        <select
          className="form-select"
          name="tipo"
          placeholder="Tipo"
          defaultValue="Todos"
        >
          {this.props.tipos.map((tipo) => {
            return (
              <option key={tipo.id} value={tipo.descripcion}>
                {tipo.descripcion}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

export default SelectTipos;
