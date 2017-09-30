let React = require('react')
let PropTypes = require('prop-types')

function SelectLanguage(props) {
  let languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

  return (
    <ul className='languages'>
      {languages.map(function (lang) {
        return (
          <li
            style={lang === props.selectedLanguage
              ? {color: '#d0021b'}
              : null}
            onClick={props.onSelect.bind(null, lang)}
            key={lang}>
            {lang}
          </li>
        )
      })}
    </ul>
  )
}

SelectLanguage.PropTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

class Popular extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedLanguage: 'All',
    }

    this.updateLanguage = this.updateLanguage.bind(this)
  }

  updateLanguage (language) {
    this.setState(function () {
      return {
        selectedLanguage: language,
      }
    })
  }

  render () {
    return (
      <SelectLanguage selectedLanguage={this.state.selectedLanguage} onSelect={this.updateLanguage} />
    )
  }
}

module.exports = Popular
