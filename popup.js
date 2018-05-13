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
        <table className='options'>
          <tr>
            <th><button onClick={this.setLocal.bind(null, true)} className={'local ' + (this.state.local === true ? 'active' : 'inactive')}>This Domain</button></th>
            <th><button onClick={this.setLocal.bind(null, false)} className={'local ' + (this.state.local === false ? 'active' : 'inactive')}>All Domains</button></th>
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
