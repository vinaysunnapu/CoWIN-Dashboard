import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {coverageData} = props
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="coverage-container">
      <h1 className="coverage-heading">Vaccination Coverage</h1>

      <BarChart
        width={1000}
        height={300}
        data={coverageData}
        margin={{
          top: 5,
        }}
      >
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: 'gray',
            strokeWidth: 0,
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: 'gray',
            strokeWidth: 0,
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 30,
          }}
        />
        <Bar dataKey="dose1" name="Dose1" fill="#5a8dee" barSize="10%" />
        <Bar dataKey="dose2" name="Dose2" fill="#f54394" barSize="10%" />
      </BarChart>
    </div>
  )
}
export default VaccinationCoverage
