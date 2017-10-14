let React = require('react')
let PropTypes = require('prop-types')
let api = require('../utils/api')

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

function RepoGrid(props) {
  return (
    <ul className='popular-list'>
      {props.repos.map(function (repo, index) {
        return (
          <li key={repo.name} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img className='avatar' src={repo.owner.avatar_url} alt={repo.owner.login}/>
              </li>
            </ul>
            <li><a href={repo.html_url}>{repo.name}</a></li>
            <li>@{repo.owner.login}</li>
            <li>{repo.stargazers_count} stars</li>
          </li>
        )
      })}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

class Popular extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedLanguage: 'All',
      repos: null
    }

    this.updateLanguage = this.updateLanguage.bind(this)
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage (language) {
    this.setState(function () {
      return {
        selectedLanguage: language,
        repos: null
      }
    });

    api.fetchPopularRepos(language)
      .then(function(repos) {
        this.setState(function() {
          return {
            repos: repos
          }
        })
      }.bind(this));
  }

  render () {
    return (
      <div>
        <SelectLanguage selectedLanguage={this.state.selectedLanguage} onSelect={this.updateLanguage} />
        {!this.state.repos ?  <p>LOADING</p> : <RepoGrid repos={this.state.repos} />}
      </div>
    )
  }
}

module.exports = Popular
