import React, {Component} from 'react'
import ReactDOM from 'react-dom'

window.addEventListener('load', () => {
  ReactDOM.render(<Application/>, document.body)
})

class Application extends Component {
  constructor(props) {
    super(props)
    this.state = {local: true, type: 'javascript'};
    ['setLocal', 'setType', 'save'].forEach(prop => this[prop] = this[prop].bind(this))
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
            <th><button onClick={this.setType.bind(null, 'javascript')} className={'kind ' + (this.state.type === 'javascript' ? 'active' : 'inactive')}>JS</button></th>
            <th><button onClick={this.setType.bind(null, 'css')} className={'kind ' + (this.state.type === 'css' ? 'active' : 'inactive')}>CSS</button></th>
          </tr>
        </table>
        <textarea placeholder='Start Coding...' className='editor'/>
        <button onSubmit={this.save} className='save'>Save</button>
      </main>
    )
  }
  setLocal(local) {
    this.setState({...this.state, local: local === true})
  }
  setType(type) {
    this.setState({...this.state, type})
  }
  save() {

  }
}
