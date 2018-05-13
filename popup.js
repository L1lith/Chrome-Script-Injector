import React, {Component} from 'react'
import ReactDOM from 'react-dom'

window.addEventListener('load', () => {
  ReactDOM.render(<Application/>, document.body)
})

class Application extends Component {
  constructor(props) {
    super(props)
    this.state = {local: true, script: true};
    ['setLocal'].forEach(prop => this[prop] = this[prop].bind(this))
  }
  render() {
    return (
      <main>
        <table>
          <tr>
            <th onClick={this.setLocal.bind(null, true)} className={this.state.local === true ? 'active' : 'inactive'}>This Domain</th>
            <th onClick={this.setLocal.bind(null, false)} className={this.state.local === false ? 'active' : 'inactive'}>All Domains</th>
          </tr>
          <tr>
            <th></th>
            <th></th>
          </tr>
        </table>
      </main>
    )
  }
  setLocal(local) {
    this.setState({...this.state, local: local === true})
  }
}
