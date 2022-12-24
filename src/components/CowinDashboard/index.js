import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
      vaccineByDay: [],
      vaccineByAge: [],
      vaccineByGender: [],
    })

    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const vaccinationDays = data.last_7_days_vaccination
      const updatedDays = vaccinationDays.map(each => ({
        dose1: each.dose_1,
        dose2: each.dose_2,
        vaccineDate: each.vaccine_date,
      }))

      const vaccinationAge = data.vaccination_by_age
      const updatedAge = vaccinationAge.map(each => ({
        age: each.age,
        count: each.count,
      }))

      const vaccineGender = data.vaccination_by_gender
      const updatedGender = vaccineGender.map(each => ({
        count: each.count,
        gender: each.gender,
      }))

      this.setState({
        vaccineByDay: updatedDays,
        vaccineByAge: updatedAge,
        vaccineByGender: updatedGender,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loading-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="100" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Something went wrong</h1>
    </div>
  )

  rendervaccineDetailsView = () => {
    const {vaccineByDay, vaccineByAge, vaccineByGender} = this.state

    return (
      <div className="vaccine-charts-container">
        <VaccinationCoverage coverageData={vaccineByDay} />
        <VaccinationByGender genderData={vaccineByGender} />
        <VaccinationByAge ageData={vaccineByAge} />
      </div>
    )
  }

  renderCowinDashBoard = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.rendervaccineDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-bg-container">
        <div className="cowin-dashboard-container">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="logo-image"
            />
            <h1 className="cowin-heading">Co-WIN</h1>
          </div>
          <h1 className="vaccination-heading">CoWIN Vaccination in india</h1>
          {this.renderCowinDashBoard()}
        </div>
      </div>
    )
  }
}
export default CowinDashboard
