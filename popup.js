import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import queryCurrentTab from './functions/queryCurrentTab'
import getConfig from './functions/getConfig'
import saveConfig from './functions/saveConfig'
import getDomain from './functions/getDomain'
import saveFile from './functions/saveFile'
import loadFile from './functions/loadFile'

const defaultConfig = {
  siteFiles: {},
  globalFiles: {},
  totalFiles: 0
}

window.addEventListener('load', () => {
  getConfig().then(config => {
    ReactDOM.render(<Application config={config}/>, document.body)
  }).catch(() => {
    ReactDOM.render(<Application config={{...defaultConfig}}/>, document.body)
  })
})

class Application extends Component {
  constructor(props) {
    super(props)
    this.state = {local: true, type: 'javascript', isSaving: false};
    ['setLocal', 'setType', 'save', 'displayError', 'load', 'clearEditor'].forEach(prop => this[prop] = this[prop].bind(this))
  }
  componentDidMount() {
    this.load()
  }
  componentDidUpdate() {
    this.load()
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
        <textarea ref={ref => this.editor = ref} placeholder='Start Coding...' className='editor'/>
        <button onClick={this.save} className='save'>{this.state.isSaving !== true ? 'Save' : 'Saving...'}</button>
      </main>
    )
  }
  setLocal(local) {
    //if (local !== this.state.local) this.load({local, type: this.state.type})
    this.setState({...this.state, local: local === true})
  }
  setType(type) {
    //if (type !== this.state.type) this.load({type, local: this.state.local})
    this.setState({...this.state, type})
  }
  clearEditor() {
    if (!this.hasOwnProperty('editor')) return
    this.editor.value = ''
  }
  load(inputObject={}) {
    let {type, local} = inputObject
    if (!this.hasOwnProperty('state')) return
    if (!type && this.state.type) type = this.state.type
    if (!local && this.state.local) local = this.state.local
    if (!this.hasOwnProperty('editor')) return
    const {config} = this.props
    if (local) {
      queryCurrentTab().then(tab => {
        const domain = getDomain(tab.url)
        if (!config.siteFiles.hasOwnProperty(domain) || !config.siteFiles[domain].hasOwnProperty(type)) return this.clearEditor()
        const id = config.siteFiles[domain][type]
        loadFile(id).then(content => {
          this.editor.value = content
        })
      })
    } else {
      if (!config.globalFiles.hasOwnProperty(type)) return this.clearEditor()
      loadFile(config.globalFiles[type]).then(content => {
        this.editor.value = content
      })
    }
  }
  save() {
    if (!this.hasOwnProperty('editor')) return
    const content = this.editor.value
    if (content.length < 1) return
    if (this.isSaving === true) return
    this.setState({...this.state, isSaving: true})
    this.isSaving = true
    const {config} = this.props
    const doneSaving = ()=>{this.setState({...this.state, isSaving: false}); this.isSaving = false}
    console.log({config})
    if (this.state.local === true) {
      queryCurrentTab().then(tab => {
        const domain = getDomain(tab.url)
        if (!config.siteFiles.hasOwnProperty(domain)) config.siteFiles[domain] = {}
        if (!config.siteFiles[domain].hasOwnProperty(this.state.type)) config.siteFiles[domain][this.state.type] = (++config.totalFiles).toString()
        saveConfig(config).then(()=>{
          const fileID = config.siteFiles[domain][this.state.type]
          saveFile(fileID, content).then(doneSaving)
        })
      }).catch(err=>{
        doneSaving()
        this.displayError(err)
      })
    } else {
      if (!config.globalFiles.hasOwnProperty(this.state.type)) {
        config.globalFiles[this.state.type] = ++config.totalFiles
        saveConfig(config)
      }
      const fileID = config.globalFiles[this.state.type]
      saveFile(fileID, content).then(doneSaving)
    }
  }
  displayError(error) {
    console.log(error)
  }
}
